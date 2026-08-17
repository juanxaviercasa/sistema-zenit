import sys
from pathlib import Path

from manim import *

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from animations.director_aquila import AquilaScene
from animations.scenespec import SceneSpec


SPEC_PATH = Path(__file__).resolve().parents[1] / "specs" / "formula_general.json"


class FormulaGeneralPresentacion(AquilaScene):
    """Modo diapositivas: elegante, navegable por beats y con fragmentos."""

    def construct(self):
        spec = SceneSpec.load(SPEC_PATH)
        previous = None
        total = len(spec.beats)
        for index, beat in enumerate(spec.beats, start=1):
            if previous is not None:
                self.play(FadeOut(*self.mobjects), run_time=spec.presentation.transition_seconds)

            slide_number = Text(f"{index:02d} / {total:02d}", font_size=18, color=GREY_B)
            slide_number.to_corner(UR, buff=0.72)
            slide_number.aquila_name = f"slide-number-{beat.id}"
            progress = Line(LEFT * 4.6, LEFT * 4.6 + RIGHT * (9.2 * index / total), stroke_width=5, color=GOLD)
            progress.to_edge(DOWN, buff=0.98)
            progress.aquila_name = f"progress-{beat.id}"
            title = Text(beat.title, font_size=32, color=GOLD)
            title.aquila_name = f"presentation-title-{beat.id}"
            self.aquila.fit_width(title, 0.78).to_edge(UP, buff=0.66)
            expression = MathTex(beat.expression, font_size=60, color=WHITE)
            expression.aquila_name = f"presentation-expression-{beat.id}"
            self.aquila.fit(expression, 0.78, 0.32).move_to(UP * 0.35)
            narration = Text(beat.narration, font_size=22, color=BLUE_B)
            narration.aquila_name = f"presentation-narration-{beat.id}"
            self.aquila.fit_width(narration, 0.78).next_to(expression, DOWN, buff=0.55)
            takeaway = Text(beat.expected_action, font_size=20, color=YELLOW)
            takeaway.aquila_name = f"presentation-takeaway-{beat.id}"
            self.aquila.fit_width(takeaway, 0.72).move_to(DOWN * 2.0)

            transition = beat.transition
            if transition == "zoom":
                self.play(GrowFromCenter(title), FadeIn(slide_number), Create(progress), run_time=0.8)
            elif transition == "slide":
                self.play(FadeIn(title, shift=RIGHT * 0.35), FadeIn(slide_number), Create(progress), run_time=0.8)
            elif transition == "wipe":
                self.play(FadeIn(title, shift=LEFT * 0.35), FadeIn(slide_number), Create(progress), run_time=0.8)
            else:
                self.play(FadeIn(title), FadeIn(slide_number), Create(progress), run_time=0.8)
            self.play(FadeIn(expression, shift=UP * 0.15), run_time=0.9)
            self.play(FadeIn(narration, shift=UP * 0.12), run_time=0.7)
            self.play(FadeIn(takeaway, shift=UP * 0.12), run_time=0.7)
            self.play(Indicate(expression, color=GOLD, scale_factor=1.03), run_time=0.8)
            self.wait(max(1.5, beat.duration - 3.0))
            previous = expression

        self.finish_aquila()
        self.wait(2)
