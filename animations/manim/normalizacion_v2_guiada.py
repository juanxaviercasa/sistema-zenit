import sys
import textwrap
from pathlib import Path

from manim import *

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))

from animations.director_aquila import AquilaScene
from animations.layout_engine import LayoutPlan
from animations.math_ledger import MathLedger
from animations.scenespec_v2 import SceneSpecV2

SPEC_PATH = PROJECT_ROOT / "animations" / "specs" / "normalizacion_v2.json"


STATE_LATEX = {
    "(a*x^2 + b*x + c)/a = 0/a": r"\frac{a x^2+b x+c}{a}=\frac{0}{a}",
    "x^2 + (b/a)*x + c/a = 0": r"x^2+\frac{b}{a}x+\frac{c}{a}=0",
    "x^2 + (b/a)*x = -c/a": r"x^2+\frac{b}{a}x=-\frac{c}{a}",
    "a*x^2 + b*x + c = 0": r"a x^2+b x+c=0",
}

GUIDE_COPY = {
    "identify-01": "Observa la forma general",
    "identify-02": "Reconoce a, b y c",
    "normalize-01": "Divide ambos miembros entre a",
    "normalize-02": "Simplifica término por término",
    "normalize-03": "Mueve c/a al segundo miembro",
}

DETAIL_LABELS = {
    "coefficient-a": "a → coeficiente cuadrático",
    "coefficient-b": "b → coeficiente lineal",
    "coefficient-c": "c → término independiente",
    "division-over-a": "Dividimos ambos miembros entre a",
    "both-members": "La misma operación se aplica a los dos miembros",
    "term-quadratic": "a·x² / a → x²",
    "term-linear": "b·x / a → (b/a)·x",
    "term-constant": "c / a → c/a",
    "constant-to-right": "Restamos c/a en ambos miembros",
    "equation-normalized-moved": "Nueva forma: términos con x a la izquierda",
}


def state_to_latex(state: str) -> str:
    return STATE_LATEX.get(state, state.replace("*", r"\, "))


def parse_audio_time(value: str) -> float:
    if value.startswith("audio:"):
        return float(value.split(":", 1)[1])
    return 0.0


class NormalizacionV2Guiada(AquilaScene):
    """Piloto SceneSpec v2 con dirección espacial y cues temporales."""

    def _text_panel(self, title: str, lines: list[str], zone, color=WHITE) -> VGroup:
        title_mob = Text(title, font_size=27, color=color)
        wrapped_lines = [part for line in lines for part in textwrap.wrap(line, width=23, break_long_words=False, break_on_hyphens=False)]
        line_mobs = [Text(line, font_size=22, color=WHITE) for line in wrapped_lines]
        panel = VGroup(title_mob, *line_mobs)
        panel.arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        self.aquila.fit_into_zone(panel, zone, min_scale=0.72, allow_compression=False, horizontal_align="left")
        return panel

    def _target_for_cue(self, cue_target: str, expression: Mobject, detail_panel: VGroup) -> Mobject:
        if cue_target in DETAIL_LABELS:
            for mob in detail_panel.submobjects:
                if getattr(mob, "aquila_detail_target", None) == cue_target:
                    return mob
        # Algunas versiones de Manim exponen `get_parts_by_tex` como un
        # atributo dinámico no invocable. El fallback seguro es resaltar toda
        # la expresión, evitando romper el render por una búsqueda frágil.
        return expression

    def _detail_for_cue(self, cue_target: str, color=GREY_B) -> Text:
        detail = Text(DETAIL_LABELS.get(cue_target, cue_target), font_size=18, color=color)
        detail.aquila_detail_target = cue_target
        return detail

    def _run_microstep_cues(self, microstep, expression: Mobject, detail_panel: VGroup, audio_duration: float) -> None:
        cues = sorted(microstep.visual, key=lambda cue: parse_audio_time(cue.at))
        elapsed = 0.0
        for cue in cues:
            cue_time = min(audio_duration, parse_audio_time(cue.at))
            if cue_time > elapsed:
                self.wait(cue_time - elapsed)
                elapsed = cue_time
            target = self._target_for_cue(cue.target, expression, detail_panel)
            if cue.action == "write" and target is expression:
                continue
            if cue.action in {"highlight", "transform"}:
                color = YELLOW if cue.color in {"YELLOW", None} else TEAL if cue.color == "TEAL" else BLUE if cue.color == "BLUE" else GREEN
                self.play(Indicate(target, color=color, scale_factor=1.04), run_time=min(max(cue.duration, 0.45), 1.4))
            elif cue.action == "point":
                self.play(Circumscribe(target, color=YELLOW), run_time=min(max(cue.duration, 0.45), 1.2))
            if cue.target in DETAIL_LABELS and cue.action in {"highlight", "transform", "write"}:
                detail = self._detail_for_cue(cue.target, color=YELLOW if cue.color == "YELLOW" else TEAL)
                detail_panel.add(detail)
                detail_panel.arrange(DOWN, buff=0.2, aligned_edge=LEFT)
                self.aquila.fit_into_zone(detail_panel, self.aquila.resolve_layout(LayoutPlan(mode="split", keep_anchor=True, allow_compression=False))["right"], min_scale=0.72, allow_compression=False, horizontal_align="left")
                self.play(FadeIn(detail, shift=RIGHT * 0.08), run_time=0.35)
            elapsed = min(audio_duration, max(elapsed, cue_time + max(cue.duration, 0.0)))
        if audio_duration > elapsed:
            self.wait(audio_duration - elapsed)

    def construct(self):
        spec = SceneSpecV2.load(SPEC_PATH)
        title = Text(spec.title, font_size=28, color=GOLD)
        title.aquila_name = "scene-title"
        self.aquila.fit_width(title, 0.78).to_edge(UP, buff=0.62)
        self.play(FadeIn(title, shift=DOWN * 0.12), run_time=0.6)

        chapter = spec.chapters[0]
        current_state = chapter.beats[0].microsteps[0].from_state
        ledger: MathLedger | None = None
        anchor: Mobject | None = None

        for beat_index, beat in enumerate(chapter.beats):
            plan_spec = beat.layout_plan
            plan = LayoutPlan(
                mode=plan_spec.mode,
                gap=plan_spec.gap,
                min_scale=plan_spec.min_scale,
                max_active_groups=plan_spec.max_active_groups,
                max_active_rows=plan_spec.max_active_rows,
                keep_anchor=plan_spec.keep_anchor,
                allow_compression=plan_spec.allow_compression,
            )
            zones = self.aquila.resolve_layout(plan)
            if beat_index == 0:
                chapter_label = Text("Capítulo 1 · Normalización", font_size=17, color=GREY_B)
                chapter_label.aquila_name = "chapter-label"
                self.aquila.fit_into_zone(chapter_label, zones["header"], min_scale=0.78, allow_compression=False)
                self.play(FadeIn(chapter_label), run_time=0.45)

            beat_title = Text(beat.title, font_size=20, color=TEAL_A)
            beat_title.aquila_name = f"beat-title-{beat.id}"

            if ledger is None:
                ledger = MathLedger(self, (zones["left"].center_x, zones["left"].center_y, 0), width=zones["left"].width, max_height=zones["left"].height, row_gap=plan.gap)
            elif plan_spec.reset_trigger == "beat_change":
                ledger.remove_ancestors(keep=1, run_time=0.45)

            if anchor is None:
                anchor = MathTex(state_to_latex(current_state), font_size=38, color=RED_C)
                anchor.aquila_name = "equation-anchor"
                anchor_block = VGroup(beat_title, anchor)
                anchor_block.arrange(DOWN, buff=0.16, aligned_edge=LEFT)
                self.aquila.fit_into_zone(anchor_block, zones["anchor"], min_scale=plan.min_scale, allow_compression=False, horizontal_align="left")
                self.play(FadeIn(anchor_block, shift=DOWN * 0.08), run_time=0.55)
            else:
                anchor_block = VGroup(beat_title, anchor)
                anchor_block.arrange(DOWN, buff=0.16, aligned_edge=LEFT)
                self.aquila.fit_into_zone(anchor_block, zones["anchor"], min_scale=plan.min_scale, allow_compression=False, horizontal_align="left")
                self.play(FadeIn(beat_title, shift=RIGHT * 0.12), run_time=0.4)

            detail_panel = None

            for microstep in beat.microsteps:
                if detail_panel is not None:
                    self.play(FadeOut(detail_panel), run_time=0.25)
                detail_panel = self._text_panel("Paso actual", [GUIDE_COPY.get(microstep.id, microstep.reason)], zones["right"], color=BLUE_B)
                detail_panel.aquila_name = f"detail-panel-{microstep.id}"
                self.play(FadeIn(detail_panel), run_time=0.35)

                expression = MathTex(state_to_latex(microstep.to_state), font_size=46, color=WHITE)
                expression.aquila_name = f"expression-{microstep.id}"
                reveal_runtime = min(2.4, max(1.2, microstep.audio.duration * 0.22))
                ledger.reveal(
                    microstep.id,
                    microstep.to_state,
                    expression,
                    animate=lambda mob: Write(mob),
                    run_time=reveal_runtime,
                    layout_zone=zones["left"],
                    keep_visible=2,
                    min_scale=plan.min_scale,
                    allow_compression=plan.allow_compression,
                    gap=plan.gap,
                )

                current_details = VGroup(*detail_panel.submobjects)
                if current_details.submobjects:
                    self.aquila.fit_into_zone(current_details, zones["right"], min_scale=0.78, allow_compression=False, horizontal_align="left")

                audio_path = PROJECT_ROOT / microstep.audio.file
                if audio_path.exists():
                    self.add_sound(str(audio_path))
                self.aquila_check(*ledger.group(), detail_panel)
                self.aquila_density_check(max_active_groups=plan.max_active_groups + 2, max_active_rows=plan.max_active_rows + 2)
                self._run_microstep_cues(microstep, expression, detail_panel, microstep.audio.duration)
                self.aquila.fit_into_zone(VGroup(*detail_panel.submobjects), zones["right"], min_scale=0.72, allow_compression=False, horizontal_align="left")
                self.wait(microstep.pause_after)

                if microstep.layout_plan.retention_policy in {"summarize", "clear_active", "reset_exercise"}:
                    ledger.remove_ancestors(keep=2, run_time=0.45)
                current_state = microstep.to_state

            if detail_panel is not None:
                self.play(FadeOut(detail_panel), run_time=0.35)
            if beat_index < len(chapter.beats) - 1:
                self.play(FadeOut(beat_title), run_time=0.35)

        closing = Text("La ecuación conserva el hilo y cada operación tiene un lugar visible.", font_size=19, color=GREEN_B)
        closing.aquila_name = "closing-message"
        zones = self.aquila.resolve_layout(LayoutPlan(mode="stacked", keep_anchor=True))
        self.aquila.fit_into_zone(closing, zones["footer"], min_scale=0.78, allow_compression=False)
        closing.shift(UP * 0.68)
        self.play(FadeIn(closing), run_time=0.55)
        self.wait(2.0)
        self.finish_aquila()
