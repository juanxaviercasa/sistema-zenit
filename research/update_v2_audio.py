from __future__ import annotations

import json
import subprocess
from pathlib import Path

root = Path(__file__).resolve().parents[1]
spec_path = root / "animations/specs/normalizacion_v2.json"
spec = json.loads(spec_path.read_text(encoding="utf-8"))
updated = []
for chapter in spec["chapters"]:
    for beat in chapter["beats"]:
        for step in beat["microsteps"]:
            audio_path = root / step["audio"]["file"]
            result = subprocess.run(
                ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(audio_path)],
                check=True,
                capture_output=True,
                text=True,
            )
            duration = round(float(result.stdout.strip()), 3)
            step["audio"]["duration"] = duration
            updated.append({"id": step["id"], "duration": duration, "file": str(audio_path)})
spec_path.write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(updated, ensure_ascii=False, indent=2))
