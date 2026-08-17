"""Contrato declarativo y auditoría pedagógica para escenas de Zenit."""

from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any


@dataclass(frozen=True)
class BeatSpec:
    id: str
    title: str
    narration: str
    expression: str
    calculation: str
    explanation: str
    duration: float
    pause_after: float
    guided_duration: float | None = None
    audio: str = ""
    audio_duration: float = 0.0
    visual_units: int = 1
    new_concepts: int = 0
    transition: str = "morph"
    emphasis: str = ""
    expected_action: str = ""

    def duration_for(self, mode_name: str) -> float:
        if mode_name == "guided" and self.guided_duration is not None:
            return self.guided_duration
        return self.duration


@dataclass(frozen=True)
class ModeSpec:
    name: str
    tempo: str
    minimum_beat_seconds: float
    maximum_visual_units: int
    reveal_fragments: bool
    transition_seconds: float


@dataclass(frozen=True)
class SceneSpec:
    id: str
    title: str
    subject: str
    learning_objective: str
    aspect_ratio: str
    guided: ModeSpec
    presentation: ModeSpec
    beats: tuple[BeatSpec, ...] = field(default_factory=tuple)

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> "SceneSpec":
        modes = raw.get("modes", {})
        guided_raw = modes.get("guided", {})
        presentation_raw = modes.get("presentation", {})
        beats = tuple(BeatSpec(**beat) for beat in raw.get("beats", []))
        return cls(
            id=raw["id"],
            title=raw["title"],
            subject=raw["subject"],
            learning_objective=raw["learning_objective"],
            aspect_ratio=raw.get("aspect_ratio", "16:9"),
            guided=ModeSpec(name="guided", **guided_raw),
            presentation=ModeSpec(name="presentation", **presentation_raw),
            beats=beats,
        )

    @classmethod
    def load(cls, path: str | Path) -> "SceneSpec":
        return cls.from_dict(json.loads(Path(path).read_text(encoding="utf-8")))

    def mode(self, name: str) -> ModeSpec:
        if name == "guided":
            return self.guided
        if name == "presentation":
            return self.presentation
        raise ValueError(f"Modo desconocido: {name}")


def audit_scenespec(spec: SceneSpec) -> tuple[dict[str, Any], list[dict[str, Any]]]:
    findings: list[dict[str, Any]] = []
    def add(level: str, code: str, message: str, beat_ids: list[str] | None = None, evidence: dict[str, Any] | None = None):
        findings.append({"level": level, "code": code, "message": message, "beats": beat_ids or [], "evidence": evidence or {}})

    if spec.aspect_ratio != "16:9":
        add("error", "SPEC_NOT_16_9", "SceneSpec no declara el lienzo 16:9.")
    if not spec.beats:
        add("error", "NO_BEATS", "La escena no contiene pasos pedagógicos.")
    if len(spec.beats) > 12:
        add("warning", "TOO_MANY_BEATS", "La escena tiene demasiados beats; conviene dividirla en dos escenas.", evidence={"count": len(spec.beats)})

    known_transitions = {"morph", "fade", "slide", "zoom", "wipe"}
    for mode_name in ("guided", "presentation"):
        mode = spec.mode(mode_name)
        if mode.minimum_beat_seconds < 2.0:
            add("error", "TEMPO_TOO_FAST", f"El modo {mode_name} permite beats demasiado rápidos.", evidence={"minimum": mode.minimum_beat_seconds})
        for beat in spec.beats:
            beat_duration = beat.duration_for(mode_name)
            if beat_duration < mode.minimum_beat_seconds:
                add("error", "BEAT_TOO_SHORT", f"El beat dura menos de lo necesario en modo {mode_name}.", [beat.id], {"duration": beat_duration, "minimum": mode.minimum_beat_seconds, "mode": mode_name})
            if beat.visual_units > mode.maximum_visual_units:
                add("error", "DENSITY_TOO_HIGH", f"El beat tiene demasiadas unidades visuales en modo {mode_name}.", [beat.id], {"visualUnits": beat.visual_units, "maximum": mode.maximum_visual_units, "mode": mode_name})
            if len(beat.narration) > (220 if mode_name == "presentation" else 170):
                add("warning", "NARRATION_DENSE", f"La narración puede ser demasiado larga para un solo beat en modo {mode_name}.", [beat.id], {"characters": len(beat.narration), "mode": mode_name})
            if beat.transition not in known_transitions:
                add("error", "UNKNOWN_TRANSITION", f"Transición no reconocida: {beat.transition}.", [beat.id])
            if beat.pause_after < 0.5:
                add("error", "PAUSE_TOO_SHORT", "Cada transformación necesita una pausa para ser procesada.", [beat.id], {"pauseAfter": beat.pause_after})
            if not beat.explanation or not beat.expected_action:
                add("error", "MISSING_PEDAGOGY", "Cada beat debe explicar qué cambia y qué debe observar el estudiante.", [beat.id])
            if mode_name == "guided" and not beat.calculation:
                add("error", "MISSING_CALCULATION", "La demostración guiada requiere el cálculo explícito del paso.", [beat.id])

    previous = None
    for beat in spec.beats:
        if previous and beat.id == previous.id:
            add("error", "DUPLICATE_BEAT_ID", "Los ids de beats deben ser únicos.", [beat.id])
        if previous and beat.new_concepts > 1 and previous.new_concepts > 1:
            add("warning", "CONCEPT_JUMP", "Se introducen conceptos nuevos en beats consecutivos; conviene intercalar una pausa o ejemplo.", [previous.id, beat.id])
        previous = beat

    total_guided = sum(beat.duration_for("guided") + beat.pause_after for beat in spec.beats)
    total_presentation = sum(max(beat.duration, spec.presentation.minimum_beat_seconds) for beat in spec.beats)
    report = {
        "spec": spec.id,
        "title": spec.title,
        "objective": spec.learning_objective,
        "beatCount": len(spec.beats),
        "guided": {"estimatedSeconds": round(total_guided, 2), "tempo": spec.guided.tempo},
        "presentation": {"estimatedSeconds": round(total_presentation, 2), "tempo": spec.presentation.tempo},
        "density": {"maxVisualUnits": max((beat.visual_units for beat in spec.beats), default=0), "totalNewConcepts": sum(beat.new_concepts for beat in spec.beats)},
        "findings": findings,
        "status": "FAIL" if any(item["level"] == "error" for item in findings) else ("WARN" if findings else "PASS"),
    }
    return report, findings
