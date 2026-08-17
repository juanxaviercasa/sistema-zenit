from __future__ import annotations

import sys
from pathlib import Path

from manim import *

PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(PROJECT_ROOT))

from animations.director_aquila import AquilaScene
from animations.math_ledger import MathLedger
from animations.scenespec_v2 import SceneSpecV2

SPEC_PATH = PROJECT_ROOT / "animations" / "specs" / "normalizacion_v2.json"


def state_to_latex(state: str) -> str:
    replacements = {
        "(a*x^2 + b*x + c)/a = 0/a": r"\frac{a x^2 + b x + c}{a}=\frac{0}{a}",
        "x^2 + (b/a)*x + c/a = 0": r"x^2+\frac{b}{a}x+\frac{c}{a}=0",
        "x^2 + (b/a)*x = -c/a": r"x^2+\frac{b}{a}x=-\frac{c}{a}",
        "a*x^2 + b*x + c = 0": r"a x^2+b x+c=0",
    }
    return replacements.get(state, state.replace("*", r"\, "))


class NormalizacionV2Guiada(AquilaScene):
    """Piloto SceneSpec v2: cada transformación se construye sobre el ledger."""

    def construct(self):
        spec = SceneSpecV2.load(SPEC_PATH)
        title = Text(spec.title, font_size=28, color=GOLD)
        title.aquila_name = "scene-title"
        self.aquila.fit_width(title, 0.78).to_edge(UP, buff=0.62)
        self.play(FadeIn(title, shift=DOWN * 0.12), run_time=0.6)

        chapter = spec.chapters[0]
        beat_label = Text("Capítulo 1 · Normalización", font_size=17, color=GREY_B)
        beat_label.aquila_name = "chapter-label"
        self.aquila.fit_width(beat_label, 0.55).to_edge(UP, buff=1.02)
        self.play(FadeIn(beat_label), run_time=0.45)

        ledger_anchor = DOWN * 0.42 + LEFT * 0.05
        ledger = MathLedger(self, ledger_anchor, width=10.2, max_height=3.12, row_gap=0.42)
        narration = None
        step_label = None

        for beat in chapter.beats:
            if step_label:
                self.play(FadeOut(step_label), run_time=0.35)
            step_label = Text(beat.title, font_size=22, color=TEAL)
            step_label.aquila_name = f"beat-title-{beat.id}"
            self.aquila.fit_width(step_label, 0.68).to_edge(UP, buff=1.45)
            self.play(FadeIn(step_label, shift=RIGHT * 0.12), run_time=0.45)

            for microstep in beat.microsteps:
                if narration:
                    self.play(FadeOut(narration), run_time=0.25)
                narration = Text(microstep.spoken_text, font_size=18, color=BLUE_B)
                narration.aquila_name = f"narration-{microstep.id}"
                self.aquila.fit_width(narration, 0.82).to_edge(DOWN, buff=0.54)
                self.play(FadeIn(narration, shift=UP * 0.08), run_time=0.38)

                audio_path = PROJECT_ROOT / microstep.audio.file
                if audio_path.exists():
                    self.add_sound(str(audio_path))

                expression = MathTex(state_to_latex(microstep.to_state), font_size=38, color=WHITE)
                expression.aquila_name = f"expression-{microstep.id}"
                self.aquila.fit(expression, 0.82, 0.19)
                reveal_runtime = max(0.9, min(2.8, microstep.audio.duration * 0.34))
                ledger.reveal(
                    microstep.id,
                    microstep.to_state,
                    expression,
                    animate=lambda mob: Write(mob),
                    run_time=reveal_runtime,
                )
                self.aquila_check(*ledger.group())

                emphasis_runtime = 0.0
                if microstep.operation != "show_context":
                    emphasis_runtime = 0.65
                    self.play(Indicate(expression, color=YELLOW, scale_factor=1.03), run_time=emphasis_runtime)
                remaining_audio = max(0.0, microstep.audio.duration - 0.38 - reveal_runtime - emphasis_runtime)
                self.wait(remaining_audio)
                self.wait(microstep.pause_after)

            ledger.assert_persistent(expected_minimum=2)

        closing = Text("Observa cómo cada línea conserva la transformación anterior.", font_size=19, color=GREEN_B)
        closing.aquila_name = "closing-message"
        self.aquila.fit_width(closing, 0.76).to_edge(DOWN, buff=0.54)
        self.play(ReplacementTransform(narration, closing), run_time=0.55)
        self.wait(2.0)
        self.finish_aquila()
