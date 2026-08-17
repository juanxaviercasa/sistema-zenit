from __future__ import annotations

import json
from pathlib import Path
import sys

root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root))
from animations.scenespec_v2 import SceneSpecV2, audit_scenespec_v2

spec = SceneSpecV2.load(root / "animations/specs/normalizacion_v2.json")
report = audit_scenespec_v2(spec, root)
(root / "reports").mkdir(exist_ok=True)
(root / "reports/normalizacion-v2-scenespec.json").write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps({key: report[key] for key in ("spec", "chapter_count", "beat_count", "microstep_count", "estimated_seconds", "error_count", "warning_count", "status")}, ensure_ascii=False, indent=2))
if report["status"] == "FAIL":
    for finding in report["findings"]:
        if finding["level"] == "error":
            print(f"ERROR {finding['code']}: {finding['message']} [{finding['item']}]")
    raise SystemExit(1)
