from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC_PATH = ROOT / "animations/specs/formula_general_numerica_v2.json"
DURATION_PATH = ROOT / "reports/formula-general-numerica-v2-audio-durations.txt"


def main() -> None:
    durations: dict[str, float] = {}
    for line in DURATION_PATH.read_text(encoding="utf-8").splitlines():
        path_text, duration_text = line.rsplit(" ", 1)
        durations[Path(path_text).name] = round(float(duration_text), 2)

    raw = json.loads(SPEC_PATH.read_text(encoding="utf-8"))
    updated = 0
    for chapter in raw["chapters"]:
        for beat in chapter["beats"]:
            for microstep in beat["microsteps"]:
                audio = microstep["audio"]
                filename = Path(audio["file"]).name
                if filename not in durations:
                    raise KeyError(f"Missing measured duration for {filename}")
                audio["duration"] = durations[filename]
                updated += 1
    SPEC_PATH.write_text(json.dumps(raw, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"updated_audio_entries": updated, "durations": durations}, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
