from __future__ import annotations

import json
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
spec = json.loads((root / "animations/specs/formula_general.json").read_text(encoding="utf-8"))
transcription = (root / "reports/formula-general-guiada-transcription.txt").read_text(encoding="utf-8")
segment_lines = [line for line in transcription.splitlines() if re.match(r"\[\d{2}:\d{2}", line)]
beats = spec["beats"]

summary = {
    "scene": spec["id"],
    "beat_count": len(beats),
    "has_microsteps": any("micro" in beat or "actions" in beat or "cues" in beat for beat in beats),
    "audio_clips": len([beat for beat in beats if beat.get("audio")]),
    "transcribed_segments": len(segment_lines),
    "segments_per_beat_approx": round(len(segment_lines) / len(beats), 2),
    "beats": [
        {
            "id": beat["id"],
            "narration_chars": len(beat.get("narration", "")),
            "visual_units": beat.get("visual_units", 0),
            "new_concepts": beat.get("new_concepts", 0),
            "pause_after": beat.get("pause_after", 0),
            "audio_duration": beat.get("audio_duration", 0),
            "has_calculation": bool(beat.get("calculation")),
            "has_expected_action": bool(beat.get("expected_action")),
        }
        for beat in beats
    ],
    "current_scene_behavior": {
        "state_persistence": "beat_group_is_faded_out_before_next_beat",
        "audio_sync_granularity": "one_audio_clip_per_beat",
        "visual_reveal_granularity": "title_narration_expression_calculation_explanation",
        "semantic_audio_cue_mapping": False,
        "learner_control": False,
        "adaptive_prior_knowledge": False,
        "post_render_semantic_collision_detection": False,
    },
}
(root / "research/zenit-baseline.json").write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding="utf-8")
print(json.dumps(summary, ensure_ascii=False, indent=2))
