#!/usr/bin/env python3
"""CLI del Director Maestro audiovisual de Zenit.

Uso:
  python animations/aquila_cli.py preflight animations/manim/formula_general.py
  python animations/aquila_cli.py postflight video.webm --report reports/formula-general.json
"""

from __future__ import annotations

import argparse
import json
import math
import shutil
import subprocess
import tempfile
from dataclasses import asdict, dataclass
from pathlib import Path

from PIL import Image, ImageChops, ImageStat

from scenespec import SceneSpec, audit_scenespec

TARGET_RATIO = 16 / 9
RATIO_TOLERANCE = 0.015
SAFE_MARGIN = 0.045
MIN_CONTENT_COVERAGE = 0.015


@dataclass
class Finding:
    level: str
    code: str
    message: str
    evidence: dict


def ffprobe(video: Path) -> dict:
    command = ["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height,r_frame_rate,duration", "-of", "json", str(video)]
    result = subprocess.run(command, check=True, capture_output=True, text=True)
    stream = json.loads(result.stdout)["streams"][0]
    rate = stream.get("r_frame_rate", "0/1").split("/")
    fps = float(rate[0]) / float(rate[1]) if len(rate) == 2 and float(rate[1]) else 0
    return {"width": int(stream["width"]), "height": int(stream["height"]), "fps": fps, "duration": float(stream.get("duration", 0) or 0)}


def sample_frames(video: Path, destination: Path, count: int = 5) -> list[Path]:
    destination.mkdir(parents=True, exist_ok=True)
    pattern = destination / "frame-%02d.png"
    subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(video), "-vf", "fps=1/2,scale=640:-1", "-frames:v", str(count), "-vsync", "0", str(pattern)], check=True)
    return sorted(destination.glob("frame-*.png"))


def content_bbox(image: Image.Image) -> tuple[int, int, int, int] | None:
    rgb = image.convert("RGB")
    background = Image.new("RGB", rgb.size, (0, 0, 0))
    diff = ImageChops.difference(rgb, background)
    diff = diff.point(lambda value: 255 if value > 18 else 0)
    return diff.getbbox()


def audit(video: Path) -> tuple[dict, list[Finding]]:
    metadata = ffprobe(video)
    findings: list[Finding] = []
    ratio = metadata["width"] / metadata["height"]
    if abs(ratio - TARGET_RATIO) > RATIO_TOLERANCE:
        findings.append(Finding("error", "NOT_16_9", "El video no respeta la relación 16:9.", {"ratio": round(ratio, 5), "expected": TARGET_RATIO}))
    if metadata["width"] < 1280 or metadata["height"] < 720:
        findings.append(Finding("warning", "LOW_RESOLUTION", "La resolución es inferior al objetivo educativo 1280×720.", {"width": metadata["width"], "height": metadata["height"]}))

    with tempfile.TemporaryDirectory(prefix="zenit-aquila-") as temporary:
        frames = sample_frames(video, Path(temporary))
        frame_reports = []
        for index, frame in enumerate(frames):
            image = Image.open(frame).convert("RGB")
            bbox = content_bbox(image)
            if not bbox:
                level = "warning" if index in (0, len(frames) - 1) else "error"
                findings.append(Finding(level, "EMPTY_FRAME", "Se detectó un frame completamente vacío; se permite únicamente como transición inicial o final.", {"frame": frame.name, "position": index}))
                continue
            left, top, right, bottom = bbox
            width, height = image.size
            margins = {"left": left / width, "right": (width - right) / width, "top": top / height, "bottom": (height - bottom) / height}
            coverage = ((right - left) * (bottom - top)) / (width * height)
            frame_reports.append({"frame": frame.name, "bbox": bbox, "margins": margins, "coverage": coverage})
            if min(margins.values()) < SAFE_MARGIN:
                findings.append(Finding("warning", "TIGHT_SAFE_MARGIN", "El contenido se acerca demasiado al borde del lienzo.", {"frame": frame.name, "margins": margins, "required": SAFE_MARGIN}))
            if coverage < MIN_CONTENT_COVERAGE:
                findings.append(Finding("warning", "LOW_CONTENT_COVERAGE", "El frame tiene muy poco contenido visible; puede ser una transición vacía.", {"frame": frame.name, "coverage": coverage}))
    return {"video": str(video), "metadata": metadata, "frameReports": frame_reports}, findings


def preflight(scene: Path) -> tuple[dict, list[Finding]]:
    text = scene.read_text(encoding="utf-8")
    findings: list[Finding] = []
    checks = {
        "usesAquilaScene": "AquilaScene" in text,
        "hasFinishCheck": "finish_aquila" in text,
        "usesFitWidthOrHeight": "fit_width" in text or "fit_height" in text,
        "usesMathTex": "MathTex" in text,
        "usesText": "Text(" in text,
    }
    if not checks["usesAquilaScene"]:
        findings.append(Finding("error", "NO_AQUILA_SCENE", "La escena no hereda de AquilaScene." , {}))
    if not checks["hasFinishCheck"]:
        findings.append(Finding("error", "NO_FINAL_CHECK", "La escena no ejecuta la auditoría final de geometría.", {}))
    if not checks["usesFitWidthOrHeight"]:
        findings.append(Finding("warning", "NO_AUTO_FIT", "No se encontró ajuste automático de texto o fórmulas al lienzo.", {}))
    return {"scene": str(scene), "checks": checks}, findings


def write_report(report_path: Path, payload: dict, findings: list[Finding]) -> None:
    payload["findings"] = [asdict(finding) for finding in findings]
    payload["status"] = "FAIL" if any(f.level == "error" for f in findings) else ("WARN" if findings else "PASS")
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(payload, ensure_ascii=False, indent=2))


def main() -> int:
    parser = argparse.ArgumentParser(description="Director Maestro audiovisual de Sistema Zenit")
    subparsers = parser.add_subparsers(dest="command", required=True)
    pre = subparsers.add_parser("preflight")
    pre.add_argument("scene", type=Path)
    pre.add_argument("--report", type=Path, default=Path("reports/aquila-preflight.json"))
    post = subparsers.add_parser("postflight")
    post.add_argument("video", type=Path)
    post.add_argument("--report", type=Path, default=Path("reports/aquila-postflight.json"))
    spec = subparsers.add_parser("spec-audit")
    spec.add_argument("spec", type=Path)
    spec.add_argument("--report", type=Path, default=Path("reports/scenespec.json"))
    args = parser.parse_args()
    if args.command == "preflight":
        payload, findings = preflight(args.scene)
    elif args.command == "postflight":
        if not args.video.exists() or not shutil.which("ffprobe"):
            print("No existe el video o falta ffprobe", flush=True)
            return 2
        payload, findings = audit(args.video)
    else:
        report, raw_findings = audit_scenespec(SceneSpec.load(args.spec))
        findings = [Finding(item["level"], item["code"], item["message"], {"beats": item.get("beats", []), **item.get("evidence", {})}) for item in raw_findings]
        payload = report
    write_report(args.report, payload, findings)
    return 1 if any(f.level == "error" for f in findings) else 0


if __name__ == "__main__":
    raise SystemExit(main())
