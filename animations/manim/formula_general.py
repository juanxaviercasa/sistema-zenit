import sys
from pathlib import Path

from manim import *

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from animations.director_aquila import AquilaScene


class FormulaGeneral(AquilaScene):
    """Deducción visual de la fórmula general bajo el contrato Aquila 16:9."""

    def construct(self):
        title = Text("De la ecuación a la fórmula general", font_size=34, color=GOLD)
        self.aquila.fit_width(title, 0.78).to_edge(UP, buff=0.45)
        title.aquila_name = "title"

        equation = MathTex("ax^2+bx+c=0", font_size=52)
        equation.aquila_name = "equation"
        self.play(Write(title), Write(equation))

        normalized = MathTex("x^2+\\frac{b}{a}x=-\\frac{c}{a}", font_size=48)
        normalized.aquila_name = "normalized"
        self.aquila.fit_width(normalized, 0.74)
        self.play(TransformMatchingTex(equation, normalized))

        square_term = MathTex("+\\left(\\frac{b}{2a}\\right)^2", font_size=48, color=YELLOW)
        square_term.aquila_name = "square-term"
        self.aquila.fit_width(square_term, 0.55).next_to(normalized, DOWN, buff=0.5)
        self.play(Write(square_term))

        completed = MathTex("\\left(x+\\frac{b}{2a}\\right)^2=\\frac{b^2-4ac}{4a^2}", font_size=44)
        completed.aquila_name = "completed-square"
        self.aquila.fit_width(completed, 0.82)
        self.play(TransformMatchingTex(normalized, completed), FadeOut(square_term))

        result = MathTex("x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}", font_size=58, color=TEAL)
        result.aquila_name = "result"
        self.aquila.fit_width(result, 0.78)
        self.play(TransformMatchingTex(completed, result))
        self.play(Circumscribe(result, color=GOLD, time_width=1.5))

        self.finish_aquila()
        self.wait(2)
