from __future__ import annotations

import sys
from pathlib import Path
from typing import Iterable

from manim import *

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))

from animations.director_aquila import AquilaScene
from animations.layout_engine import LayoutPlan
from animations.scenespec_v2 import SceneSpecV2

SPEC_PATH = PROJECT_ROOT / "animations" / "specs" / "formula_general_numerica_v2.json"

STATE_LATEX = {
    "2*x^2 + 8*x + 6 = 0": r"2x^2+8x+6=0",
    "x = (-b +or- sqrt(b^2 - 4*a*c))/(2*a)": r"x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}",
    "x = (-(8) +or- sqrt((8)^2 - 4*(2)*(6)))/(2*(2))": r"x=\frac{-(8)\pm\sqrt{(8)^2-4(2)(6)}}{2(2)}",
    "Delta = 64 - 48 = 16": r"\Delta=64-48=16",
    "x = (-8 +or- sqrt(16))/4": r"x=\frac{-8\pm\sqrt{16}}{4}",
    "x = (-8 +or- 4)/4": r"x=\frac{-8\pm4}{4}",
    "x1 = (-8 + 4)/4 = -1": r"x_1=\frac{-8+4}{4}=-1",
    "x2 = (-8 - 4)/4 = -3": r"x_2=\frac{-8-4}{4}=-3",
    "P(-1)=0; P(-3)=0": r"P(-1)=0\qquad P(-3)=0",
    "x1=-1; x2=-3": r"x_1=-1\qquad x_2=-3",
}

SEMANTIC_COLORS = {
    "a": RED_C,
    "b": BLUE_C,
    "c": GREEN_C,
    "discriminant": GOLD,
    "branches": YELLOW,
    "root-one": RED_C,
    "root-two": BLUE_C,
    "verification": GREEN_C,
    "final": GOLD,
    "summary": TEAL_A,
}


def state_to_latex(state: str) -> str:
    return STATE_LATEX.get(state, state)


def parse_audio_time(value: str) -> float:
    if value.startswith("audio:"):
        try:
            return float(value.split(":", 1)[1])
        except ValueError:
            return 0.0
    return 0.0


def semantic_color(key: str | None, fallback=YELLOW):
    return SEMANTIC_COLORS.get(key or "", fallback)


class FormulaGeneralNumericaV2Guiada(AquilaScene):
    """Video piloto resolution-first: primero se mide, después se anima."""

    def _plan(self, plan_spec) -> LayoutPlan:
        return LayoutPlan(
            mode=plan_spec.mode,
            gap=plan_spec.gap,
            min_scale=plan_spec.min_scale,
            max_active_groups=plan_spec.max_active_groups,
            max_active_rows=plan_spec.max_active_rows,
            keep_anchor=plan_spec.keep_anchor,
            allow_compression=plan_spec.allow_compression,
        )

    def _place(self, group: Mobject, zone, name: str, min_scale: float, align: str = "center") -> Mobject:
        group.aquila_name = name
        self.aquila_measure(name, group, zone, min_scale=min_scale)
        self.aquila.fit_into_zone(group, zone, min_scale=min_scale, allow_compression=False, horizontal_align=align)
        return group

    def _equation_parts(self, font_size: float = 52) -> VGroup:
        parts = VGroup(
            MathTex("2x^2", font_size=font_size, color=SEMANTIC_COLORS["a"]),
            MathTex("+", font_size=font_size, color=WHITE),
            MathTex("8x", font_size=font_size, color=SEMANTIC_COLORS["b"]),
            MathTex("+", font_size=font_size, color=WHITE),
            MathTex("6", font_size=font_size, color=SEMANTIC_COLORS["c"]),
            MathTex("=0", font_size=font_size, color=WHITE),
        )
        parts.arrange(RIGHT, buff=0.12)
        return parts

    def _binding_card(self, symbol: str, value: str, label: str, color, name: str) -> VGroup:
        symbol_mob = MathTex(symbol, font_size=31, color=color)
        arrow = MathTex(r"\mapsto", font_size=25, color=GREY_B)
        value_mob = MathTex(value, font_size=31, color=WHITE)
        row = VGroup(symbol_mob, arrow, value_mob).arrange(RIGHT, buff=0.12)
        caption = Text(label, font_size=14, color=GREY_B)
        body = VGroup(row, caption).arrange(DOWN, buff=0.08)
        frame = SurroundingRectangle(body, color=color, stroke_width=1.5, buff=0.12)
        card = VGroup(frame, body)
        card.aquila_name = name
        card.semantic_symbol = symbol
        card.semantic_value = value
        return card

    def _mapping_panel(self, *, compact: bool = False) -> VGroup:
        size = 25 if compact else 29
        cards = [
            self._binding_card("b", "8", "lineal", SEMANTIC_COLORS["b"], "mapping-b"),
            self._binding_card("a", "2", "cuadrático", SEMANTIC_COLORS["a"], "mapping-a"),
            self._binding_card("c", "6", "independiente", SEMANTIC_COLORS["c"], "mapping-c"),
        ]
        for card in cards:
            card.scale(size / 29)
        panel_title = Text("Correspondencias", font_size=20 if compact else 23, color=TEAL_A)
        panel = VGroup(panel_title, *cards).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        return panel

    def _text_block(self, title: str, body: str, font_size: int = 22) -> VGroup:
        title_mob = Text(title, font_size=23, color=TEAL_A)
        body_mob = Text(body, font_size=font_size, color=WHITE, line_spacing=0.9)
        block = VGroup(title_mob, body_mob).arrange(DOWN, buff=0.16, aligned_edge=LEFT)
        return block

    def _run_cues(self, microstep, targets: dict[str, Mobject], audio_duration: float, elapsed: float) -> None:
        cues = sorted(microstep.visual, key=lambda cue: parse_audio_time(cue.at))
        for cue in cues:
            cue_time = min(audio_duration, parse_audio_time(cue.at))
            if cue_time > elapsed:
                self.wait(cue_time - elapsed)
                elapsed = cue_time
            target = targets.get(cue.target)
            if target is None:
                continue
            color = semantic_color(cue.semantic_key, semantic_color(cue.target, YELLOW))
            if cue.action in {"highlight", "transform", "write"}:
                self.play(Indicate(target, color=color, scale_factor=1.06), run_time=min(max(cue.duration, 0.45), 1.25))
            elif cue.action == "point":
                self.play(Circumscribe(target, color=color), run_time=min(max(cue.duration, 0.45), 1.1))
            elapsed = min(audio_duration, max(elapsed, cue_time + max(cue.duration, 0.0)))
        if audio_duration > elapsed:
            self.wait(audio_duration - elapsed)

    def _show_active(self, groups: list[Mobject], targets: dict[str, Mobject], plan_spec, zones: dict[str, object], *, primary: Mobject | None = None, primary_zone: str = "active") -> None:
        if primary is not None:
            self._place(primary, zones[primary_zone], getattr(primary, "aquila_name", "primary"), plan_spec.min_scale, "left" if primary_zone in {"left", "right"} else "center")
        for group in groups:
            if group is primary:
                continue
            zone_name = getattr(group, "aquila_zone", primary_zone)
            self._place(group, zones[zone_name], getattr(group, "aquila_name", "active"), plan_spec.min_scale, "left" if zone_name in {"left", "right"} else "center")
        named = {getattr(group, "aquila_name", f"active-{index}"): group for index, group in enumerate(groups + ([primary] if primary is not None else []))}
        self.aquila.assert_no_overlap(named)
        self.aquila_check(*named.values())
        self.play(*[FadeIn(group, shift=UP * 0.08) for group in groups + ([primary] if primary is not None else [])], run_time=0.65)

    def _prepare_beat(self, beat, zones, anchor_block: Mobject, old_active: list[Mobject]) -> tuple[Text, list[Mobject], dict[str, Mobject]]:
        if old_active:
            self.play(*[FadeOut(group) for group in old_active], run_time=0.35)
        beat_title = Text(beat.title, font_size=22, color=TEAL_A)
        beat_title.aquila_name = f"beat-title-{beat.id}"
        self._place(beat_title, zones["header"], beat_title.aquila_name, 0.78, "left")
        self.play(FadeIn(beat_title, shift=RIGHT * 0.1), run_time=0.4)
        return beat_title, [], {}

    def _build_beat(self, beat, zones) -> tuple[list[Mobject], dict[str, Mobject]]:
        step = beat.microsteps[0]
        groups: list[Mobject] = []
        targets: dict[str, Mobject] = {}
        if beat.id == "problem":
            equation = self._equation_parts(52)
            equation.aquila_name = "equation-problem"
            equation.aquila_zone = "active"
            goal = self._text_block("Objetivo", "Encontrar las dos raíces\nsin saltarnos cálculos.", 23)
            goal.aquila_name = "problem-goal"
            goal.aquila_zone = "active"
            block = VGroup(equation, goal).arrange(DOWN, buff=0.35)
            block.aquila_name = "problem-block"
            block.aquila_zone = "active"
            groups = [block]
            targets["equation-problem"] = equation
        elif beat.id == "bindings":
            equation = self._equation_parts(39)
            equation.aquila_name = "binding-equation"
            equation.aquila_zone = "anchor"
            cards = [
                ("binding-a", self._binding_card("a", "2", "cuadrático", SEMANTIC_COLORS["a"], "binding-a"), "left"),
                ("binding-b", self._binding_card("b", "8", "lineal", SEMANTIC_COLORS["b"], "binding-b"), "center"),
                ("binding-c", self._binding_card("c", "6", "independiente", SEMANTIC_COLORS["c"], "binding-c"), "right"),
            ]
            for key, card, zone_name in cards:
                card.aquila_zone = zone_name
                groups.append(card)
                targets[key] = card
            targets["binding-equation"] = equation
        elif beat.id == "formula":
            formula = MathTex(r"x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}", font_size=58, color=WHITE)
            formula.set_color_by_tex("b", SEMANTIC_COLORS["b"])
            formula.set_color_by_tex("a", SEMANTIC_COLORS["a"])
            formula.set_color_by_tex("c", SEMANTIC_COLORS["c"])
            formula.aquila_name = "formula-general"
            formula.aquila_zone = "active"
            note = self._text_block("Mapa de sustitución", "b aparece arriba; a aparece\nen el denominador y junto a c.", 22)
            note.aquila_name = "formula-note"
            note.aquila_zone = "active"
            block = VGroup(formula, note).arrange(DOWN, buff=0.35)
            block.aquila_name = "formula-block"
            block.aquila_zone = "active"
            groups = [block]
            targets.update({"formula-general": formula, "formula-b": formula, "formula-a": formula, "formula-c": formula})
        elif beat.id == "substitution":
            expression = MathTex(r"x=\frac{-(8)\pm\sqrt{(8)^2-4(2)(6)}}{2(2)}", font_size=43, color=WHITE)
            expression.set_color_by_tex("8", SEMANTIC_COLORS["b"])
            expression.set_color_by_tex("2", SEMANTIC_COLORS["a"])
            expression.set_color_by_tex("6", SEMANTIC_COLORS["c"])
            expression.aquila_name = "substitution-left"
            expression.aquila_zone = "left"
            mapping = self._mapping_panel(compact=True)
            mapping.aquila_name = "substitution-right"
            mapping.aquila_zone = "right"
            groups = [expression, mapping]
            targets.update({"substitution-left": expression, "substitution-right": mapping, "substitution-a": mapping, "substitution-b": mapping, "substitution-c": mapping})
        elif beat.id == "discriminant":
            expression = MathTex(r"x=\frac{-8\pm\sqrt{\Delta}}{4}", font_size=47, color=WHITE)
            expression.aquila_name = "delta-left"
            expression.aquila_zone = "left"
            rows = [
                MathTex(r"(8)^2=64", font_size=32, color=SEMANTIC_COLORS["b"]),
                MathTex(r"4(2)(6)=48", font_size=32, color=SEMANTIC_COLORS["a"]),
                MathTex(r"\Delta=64-48=16", font_size=36, color=GOLD),
            ]
            for row, name in zip(rows, ("delta-64", "delta-48", "delta-16")):
                row.aquila_name = name
            panel = VGroup(Text("Discriminante", font_size=22, color=TEAL_A), *rows).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
            panel.aquila_name = "delta-right"
            panel.aquila_zone = "right"
            groups = [expression, panel]
            targets.update({"delta-left": expression, "delta-64": rows[0], "delta-48": rows[1], "delta-16": rows[2]})
        elif beat.id == "intermediate":
            expression = MathTex(r"x=\frac{-8\pm4}{4}", font_size=62, color=WHITE)
            expression.aquila_name = "intermediate-expression"
            expression.aquila_zone = "active"
            note = self._text_block("Dos ramas", "El signo ± separa\ndos cálculos.", 24)
            note.aquila_name = "intermediate-note"
            note.aquila_zone = "active"
            block = VGroup(expression, note).arrange(DOWN, buff=0.32)
            block.aquila_name = "intermediate-block"
            block.aquila_zone = "active"
            groups = [block]
            targets.update({"sqrt-16": expression, "plus-minus": expression})
        elif beat.id == "root-one":
            calc = MathTex(r"x_1=\frac{-8+4}{4}=\frac{-4}{4}", font_size=42, color=WHITE)
            result = MathTex(r"x_1=-1", font_size=52, color=GOLD)
            calc.aquila_name = "root-one-calc"
            calc.aquila_zone = "left"
            result.aquila_name = "root-one-result"
            result.aquila_zone = "right"
            guide = Text("Rama +", font_size=28, color=RED_C)
            guide.aquila_name = "root-one-guide"
            guide.aquila_zone = "right"
            panel = VGroup(guide, result).arrange(DOWN, buff=0.28)
            panel.aquila_name = "root-one-panel"
            panel.aquila_zone = "right"
            groups = [calc, panel]
            targets.update({"root-one-calc": calc, "root-one-result": result, "root-one-guide": guide})
        elif beat.id == "root-two":
            previous = MathTex(r"x_1=-1", font_size=31, color=GREY_B)
            calc = MathTex(r"x_2=\frac{-8-4}{4}=\frac{-12}{4}", font_size=42, color=WHITE)
            result = MathTex(r"x_2=-3", font_size=52, color=GOLD)
            previous.aquila_name = "root-one-memory"
            previous.aquila_zone = "left"
            calc.aquila_name = "root-two-calc"
            calc.aquila_zone = "left"
            result.aquila_name = "root-two-result"
            result.aquila_zone = "right"
            guide = Text("Rama −", font_size=28, color=BLUE_C)
            guide.aquila_name = "root-two-guide"
            guide.aquila_zone = "right"
            left = VGroup(previous, calc).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
            left.aquila_name = "root-two-left"
            left.aquila_zone = "left"
            right = VGroup(guide, result).arrange(DOWN, buff=0.28)
            right.aquila_name = "root-two-right"
            right.aquila_zone = "right"
            groups = [left, right]
            targets.update({"root-two-calc": calc, "root-two-result": result, "root-two-guide": guide})
        elif beat.id == "verify":
            one = MathTex(r"2(-1)^2+8(-1)+6=0", font_size=34, color=RED_C)
            two = MathTex(r"2(-3)^2+8(-3)+6=0", font_size=34, color=BLUE_C)
            zero_one = Text("2−8+6=0", font_size=26, color=GREEN_C)
            zero_two = Text("18−24+6=0", font_size=26, color=GREEN_C)
            card_one = VGroup(Text("x₁ = −1", font_size=23, color=RED_C), one, zero_one).arrange(DOWN, buff=0.18)
            card_two = VGroup(Text("x₂ = −3", font_size=23, color=BLUE_C), two, zero_two).arrange(DOWN, buff=0.18)
            card_one.aquila_name = "verify-one"
            card_one.aquila_zone = "left"
            card_two.aquila_name = "verify-two"
            card_two.aquila_zone = "right"
            groups = [card_one, card_two]
            targets.update({"verify-one": card_one, "verify-two": card_two, "verify-zero": VGroup(zero_one, zero_two)})
        elif beat.id == "close":
            roots = MathTex(r"x_1=-1\qquad x_2=-3", font_size=66, color=GOLD)
            roots.aquila_name = "final-roots"
            roots.aquila_zone = "active"
            summary = self._text_block("Secuencia", "identificar → sustituir → calcular\n→ separar → verificar", 24)
            summary.aquila_name = "final-summary"
            summary.aquila_zone = "active"
            block = VGroup(roots, summary).arrange(DOWN, buff=0.35)
            block.aquila_name = "final-block"
            block.aquila_zone = "active"
            groups = [block]
            targets.update({"final-roots": roots, "final-summary": summary})
        return groups, targets

    def construct(self):
        spec = SceneSpecV2.load(SPEC_PATH)
        chapter = spec.chapters[0]
        header_zone = self.aquila.resolve_layout(LayoutPlan(mode="linear", keep_anchor=False))["header"]
        title = Text("FÓRMULA GENERAL · EJEMPLO NUMÉRICO", font_size=28, color=GOLD)
        title.aquila_name = "scene-title"
        self.aquila.fit_width(title, 0.78)
        self._place(title, header_zone, "scene-title", 0.8, "left")
        self.play(FadeIn(title, shift=DOWN * 0.1), run_time=0.55)

        anchor_plan = LayoutPlan(mode="linear", keep_anchor=True, gap=0.34, min_scale=0.82, allow_compression=False)
        anchor_zones = self.aquila.resolve_layout(anchor_plan)
        chapter_label = Text("Ejemplo: 2x² + 8x + 6 = 0", font_size=20, color=GREY_B)
        anchor_equation = self._equation_parts(39)
        anchor_block = VGroup(chapter_label, anchor_equation).arrange(DOWN, buff=0.12, aligned_edge=LEFT)
        anchor_block.aquila_name = "problem-anchor"
        self._place(anchor_block, anchor_zones["anchor"], "problem-anchor", 0.78, "left")
        self.play(FadeIn(anchor_block, shift=DOWN * 0.08), run_time=0.55)

        active: list[Mobject] = []
        for beat in chapter.beats:
            plan_spec = beat.layout_plan
            zones = self.aquila.resolve_layout(self._plan(plan_spec))
            beat_title, _, _ = self._prepare_beat(beat, zones, anchor_block, active)
            active, targets = self._build_beat(beat, zones)
            self._show_active(active, targets, plan_spec, zones)
            step = beat.microsteps[0]
            audio_path = PROJECT_ROOT / step.audio.file
            if not audio_path.exists():
                raise FileNotFoundError(audio_path)
            self.add_sound(str(audio_path))
            main_elapsed = min(2.0, max(0.85, step.audio.duration * 0.08))
            self._run_cues(step, targets, step.audio.duration, main_elapsed)
            self.wait(step.pause_after)
            self.aquila_density_check(max_active_groups=plan_spec.max_active_groups + 2, max_active_rows=plan_spec.max_active_rows + 2)
            self.aquila_check(*active, beat_title, anchor_block)
            self.aquila.assert_no_overlap({getattr(group, "aquila_name", f"active-{index}"): group for index, group in enumerate(active)})
            self.play(FadeOut(beat_title), run_time=0.3)

        closing = Text("Muestra completa: cada dato reemplaza a una letra y cada raíz se verifica.", font_size=20, color=GREEN_B)
        closing.aquila_name = "closing-message"
        closing_zone = self.aquila.resolve_layout(LayoutPlan(mode="stacked", keep_anchor=False))["footer"]
        self._place(closing, closing_zone, "closing-message", 0.78, "center")
        closing.shift(UP * 0.65)
        self.play(FadeIn(closing), run_time=0.5)
        self.wait(2.0)
        self.finish_aquila()


if __name__ == "__main__":
    FormulaGeneralNumericaV2Guiada().render()
