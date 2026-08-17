from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Iterable


@dataclass(frozen=True)
class AudioCue:
    id: str
    text: str
    file: str
    duration: float
    start: float = 0.0
    rate_wpm: int = 150


@dataclass(frozen=True)
class VisualCue:
    action: str
    target: str
    at: str = "start"
    duration: float = 0.0
    color: str | None = None
    value: str | None = None


@dataclass(frozen=True)
class VerificationSpec:
    type: str
    engine: str = "sympy"
    expected: str = ""
    assumptions: tuple[str, ...] = field(default_factory=tuple)


@dataclass(frozen=True)
class CheckpointSpec:
    type: str
    prompt: str
    required_before_continue: bool = False
    reveal_after: str = "continue"


@dataclass(frozen=True)
class LayoutConstraint:
    relation: str
    subject: str
    target: str
    value: str | float | None = None


@dataclass(frozen=True)
class LayoutPlanSpec:
    mode: str = "linear"
    gap: float = 0.34
    min_scale: float = 0.75
    max_active_groups: int = 4
    max_active_rows: int = 5
    keep_anchor: bool = True
    allow_compression: bool = True
    retention_policy: str = "demote"
    reset_trigger: str = "none"


@dataclass(frozen=True)
class LedgerSpec:
    keep_previous: bool = True
    previous_opacity: float = 0.38
    ancestor_opacity: float = 0.16
    stack_position: str = "below"
    show_operation_badge: bool = True


@dataclass(frozen=True)
class MicroStepSpec:
    id: str
    from_state: str
    to_state: str
    operation: str
    reason: str
    spoken_text: str
    audio: AudioCue
    visual: tuple[VisualCue, ...]
    pause_after: float
    layout_plan: LayoutPlanSpec
    ledger: LedgerSpec
    verification: VerificationSpec
    checkpoint: CheckpointSpec | None = None
    layout_constraints: tuple[LayoutConstraint, ...] = field(default_factory=tuple)
    difficulty: str = "guided"
    hidden_targets: tuple[str, ...] = field(default_factory=tuple)


@dataclass(frozen=True)
class BeatV2:
    id: str
    title: str
    question: str
    objective: str
    microsteps: tuple[MicroStepSpec, ...]
    close_message: str
    layout_plan: LayoutPlanSpec = field(default_factory=LayoutPlanSpec)
    duration_hint: float = 0.0


@dataclass(frozen=True)
class ChapterSpec:
    id: str
    title: str
    objective: str
    beats: tuple[BeatV2, ...]
    prerequisite_ids: tuple[str, ...] = field(default_factory=tuple)


@dataclass(frozen=True)
class ModeV2:
    name: str
    tempo: str
    learner_control: str
    full_solution: bool
    show_ledger: bool
    require_checkpoints: bool


@dataclass(frozen=True)
class SceneSpecV2:
    id: str
    title: str
    subject: str
    language: str
    aspect_ratio: str
    learning_objective: str
    level: str
    modes: tuple[ModeV2, ...]
    chapters: tuple[ChapterSpec, ...]

    @classmethod
    def from_dict(cls, raw: dict[str, Any]) -> "SceneSpecV2":
        modes = tuple(ModeV2(**item) for item in raw.get("modes", []))
        chapters: list[ChapterSpec] = []
        for chapter_raw in raw.get("chapters", []):
            beats: list[BeatV2] = []
            for beat_raw in chapter_raw.get("beats", []):
                microsteps: list[MicroStepSpec] = []
                for step_raw in beat_raw.get("microsteps", []):
                    audio = AudioCue(**step_raw["audio"])
                    visual = tuple(VisualCue(**cue) for cue in step_raw.get("visual", []))
                    verification_raw = step_raw.get("verification", {})
                    verification = VerificationSpec(
                        type=verification_raw.get("type", "none"),
                        engine=verification_raw.get("engine", "sympy"),
                        expected=verification_raw.get("expected", ""),
                        assumptions=tuple(verification_raw.get("assumptions", [])),
                    )
                    checkpoint_raw = step_raw.get("checkpoint")
                    checkpoint = CheckpointSpec(**checkpoint_raw) if checkpoint_raw else None
                    layout_plan = LayoutPlanSpec(**step_raw.get("layout_plan", beat_raw.get("layout_plan", {})))
                    ledger = LedgerSpec(**step_raw.get("ledger", {}))
                    constraints = tuple(LayoutConstraint(**item) for item in step_raw.get("layout_constraints", []))
                    microsteps.append(
                        MicroStepSpec(
                            id=step_raw["id"],
                            from_state=step_raw["from_state"],
                            to_state=step_raw["to_state"],
                            operation=step_raw["operation"],
                            reason=step_raw["reason"],
                            spoken_text=step_raw["spoken_text"],
                            audio=audio,
                            visual=visual,
                            pause_after=float(step_raw["pause_after"]),
                            layout_plan=layout_plan,
                            ledger=ledger,
                            verification=verification,
                            checkpoint=checkpoint,
                            layout_constraints=constraints,
                            difficulty=step_raw.get("difficulty", "guided"),
                            hidden_targets=tuple(step_raw.get("hidden_targets", [])),
                        )
                    )
                beats.append(
                    BeatV2(
                        id=beat_raw["id"],
                        title=beat_raw["title"],
                        question=beat_raw["question"],
                        objective=beat_raw["objective"],
                        microsteps=tuple(microsteps),
                        close_message=beat_raw["close_message"],
                        layout_plan=LayoutPlanSpec(**beat_raw.get("layout_plan", {})),
                        duration_hint=float(beat_raw.get("duration_hint", 0.0)),
                    )
                )
            chapters.append(
                ChapterSpec(
                    id=chapter_raw["id"],
                    title=chapter_raw["title"],
                    objective=chapter_raw["objective"],
                    beats=tuple(beats),
                    prerequisite_ids=tuple(chapter_raw.get("prerequisite_ids", [])),
                )
            )
        return cls(
            id=raw["id"],
            title=raw["title"],
            subject=raw["subject"],
            language=raw.get("language", "es-419"),
            aspect_ratio=raw.get("aspect_ratio", "16:9"),
            learning_objective=raw["learning_objective"],
            level=raw.get("level", "beginner"),
            modes=modes,
            chapters=tuple(chapters),
        )

    @classmethod
    def load(cls, path: str | Path) -> "SceneSpecV2":
        return cls.from_dict(json.loads(Path(path).read_text(encoding="utf-8")))

    def iter_beats(self) -> Iterable[BeatV2]:
        for chapter in self.chapters:
            yield from chapter.beats

    def iter_microsteps(self) -> Iterable[MicroStepSpec]:
        for beat in self.iter_beats():
            yield from beat.microsteps

    @property
    def microstep_count(self) -> int:
        return sum(1 for _ in self.iter_microsteps())

    @property
    def estimated_seconds(self) -> float:
        return round(sum(step.audio.duration + step.pause_after for step in self.iter_microsteps()), 2)


def audit_scenespec_v2(spec: SceneSpecV2, project_root: str | Path | None = None) -> dict[str, Any]:
    findings: list[dict[str, Any]] = []

    def add(level: str, code: str, message: str, item: str = "", evidence: dict[str, Any] | None = None) -> None:
        findings.append({"level": level, "code": code, "message": message, "item": item, "evidence": evidence or {}})

    root = Path(project_root) if project_root is not None else None
    if spec.aspect_ratio != "16:9":
        add("error", "SPEC_NOT_16_9", "La escena debe declarar 16:9.")
    if not spec.chapters:
        add("error", "NO_CHAPTERS", "La escena no tiene capítulos.")
    if not spec.modes:
        add("error", "NO_MODES", "La escena no declara modalidades de reproducción.")

    ids: set[str] = set()
    for chapter in spec.chapters:
        if not chapter.beats:
            add("error", "EMPTY_CHAPTER", "El capítulo no tiene beats.", chapter.id)
        for beat in chapter.beats:
            if not beat.microsteps:
                add("error", "EMPTY_BEAT", "El beat no tiene microsteps.", beat.id)
            for step in beat.microsteps:
                if step.id in ids:
                    add("error", "DUPLICATE_MICROSTEP_ID", "El id del microstep está repetido.", step.id)
                ids.add(step.id)
                if not step.from_state or not step.to_state:
                    add("error", "MISSING_STATE_TRANSITION", "Cada microstep necesita estado inicial y final.", step.id)
                if not step.operation or not step.reason:
                    add("error", "MISSING_JUSTIFICATION", "Cada transformación necesita operación y justificación.", step.id)
                if not step.spoken_text:
                    add("error", "MISSING_SPOKEN_TEXT", "Falta la narración del microstep.", step.id)
                if step.audio.duration <= 0:
                    add("error", "AUDIO_DURATION_INVALID", "El audio debe tener duración positiva.", step.id)
                if root is not None and not (root / step.audio.file).exists():
                    add("error", "AUDIO_FILE_MISSING", "No existe el archivo de audio declarado.", step.id, {"file": step.audio.file})
                if step.audio.text.strip() != step.spoken_text.strip():
                    add("warning", "AUDIO_SCRIPT_MISMATCH", "El texto del audio y el texto hablado del microstep no coinciden exactamente.", step.id)
                if not step.visual:
                    add("error", "NO_VISUAL_CUES", "El microstep no tiene cues visuales.", step.id)
                if step.pause_after < 0.8:
                    add("warning", "PROCESSING_PAUSE_SHORT", "La pausa puede ser insuficiente para procesar la transformación.", step.id, {"pause": step.pause_after})
                if step.layout_plan.mode not in {"linear", "split", "triad", "stacked", "reset"}:
                    add("error", "UNKNOWN_LAYOUT_MODE", "El modo de composición no está permitido.", step.id, {"mode": step.layout_plan.mode})
                if not 0.55 <= step.layout_plan.min_scale <= 1.0:
                    add("error", "INVALID_MIN_SCALE", "La escala mínima legible debe estar entre 0.55 y 1.0.", step.id, {"min_scale": step.layout_plan.min_scale})
                if step.layout_plan.max_active_groups < 1 or step.layout_plan.max_active_rows < 1:
                    add("error", "INVALID_DENSITY_BUDGET", "Los presupuestos de densidad deben ser positivos.", step.id)
                if step.layout_plan.retention_policy not in {"keep", "demote", "summarize", "clear_active", "reset_exercise"}:
                    add("error", "UNKNOWN_RETENTION_POLICY", "La política de persistencia no está permitida.", step.id, {"retention_policy": step.layout_plan.retention_policy})
                if not any(cue.target for cue in step.visual):
                    add("error", "AUDIO_VISUAL_DESYNC", "La narración no tiene objetivo visual asociado.", step.id)
                if step.verification.type == "none":
                    add("warning", "NO_VERIFICATION", "El microstep no declara verificación simbólica.", step.id)
                else:
                    try:
                        try:
                            from animations.symbolic_verify import verify_step
                        except ModuleNotFoundError:
                            from symbolic_verify import verify_step
                        symbolic_result = verify_step(step)
                        if symbolic_result["status"] == "FAIL":
                            add("error", "SYMBOLIC_VERIFICATION_FAILED", "La transformación no pudo verificarse como equivalente.", step.id, symbolic_result)
                        elif symbolic_result["status"] == "ERROR":
                            add("error", "SYMBOLIC_VERIFICATION_ERROR", "No fue posible analizar la transformación simbólicamente.", step.id, symbolic_result)
                    except Exception as exc:  # noqa: BLE001
                        add("error", "SYMBOLIC_ENGINE_UNAVAILABLE", "El motor simbólico no pudo ejecutarse.", step.id, {"message": str(exc)})
                if step.operation != "show_context" and not step.ledger.keep_previous:
                    add("error", "UNEXPLAINED_ERASURE", "La transformación elimina el historial sin una política de persistencia.", step.id)
                if step.checkpoint is None:
                    add("warning", "NO_CHECKPOINT", "El microstep no ofrece una oportunidad explícita de observación o control.", step.id)

    allowed_relations = {"inside", "below", "above", "aligned_with", "attached_to", "must_not_overlap", "highlighted_when"}
    for step in spec.iter_microsteps():
        for constraint in step.layout_constraints:
            if constraint.relation not in allowed_relations:
                add("error", "UNKNOWN_LAYOUT_RELATION", "La relación de layout no está permitida.", step.id, {"relation": constraint.relation})

    for mode in spec.modes:
        if mode.name == "guided" and not mode.show_ledger:
            add("error", "GUIDED_WITHOUT_LEDGER", "El modo guiado debe mostrar el ledger acumulativo.", mode.name)
        if mode.name == "practice" and mode.full_solution:
            add("error", "PRACTICE_FULL_SOLUTION", "La práctica no debe revelar toda la solución desde el inicio.", mode.name)

    return {
        "spec": spec.id,
        "title": spec.title,
        "chapter_count": len(spec.chapters),
        "beat_count": sum(1 for _ in spec.iter_beats()),
        "microstep_count": spec.microstep_count,
        "estimated_seconds": spec.estimated_seconds,
        "finding_count": len(findings),
        "error_count": sum(item["level"] == "error" for item in findings),
        "warning_count": sum(item["level"] == "warning" for item in findings),
        "status": "FAIL" if any(item["level"] == "error" for item in findings) else ("WARN" if findings else "PASS"),
        "findings": findings,
    }
