import sys
from pathlib import Path

from manim import *

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
from animations.director_aquila import AquilaScene
from animations.scenespec import SceneSpec


PROJECT_ROOT = Path(__file__).resolve().parents[2]
SPEC_PATH = PROJECT_ROOT / "animations" / "specs" / "formula_general.json"


class FormulaGeneralGuiada(AquilaScene):
    """Demostración lenta con narración neural sincronizada por beat."""

    def construct(self):
        spec = SceneSpec.load(SPEC_PATH)
        header = Text(spec.title, font_size=28, color=GOLD)
        self.aquila.fit_width(header, 0.82).to_edge(UP, buff=0.72)
        header.aquila_name = "guided-header"
        self.play(FadeIn(header, shift=DOWN * 0.2), run_time=0.7)

        current_beat_group = []
        for index, beat in enumerate(spec.beats, start=1):
            if current_beat_group:
                self.play(FadeOut(*current_beat_group, shift=UP * 0.15), run_time=0.55)
                self.remove(*current_beat_group)
                current_beat_group = []

            audio_path = PROJECT_ROOT / beat.audio
            if not audio_path.exists():
                raise FileNotFoundError(f"Falta el audio TTS del beat {beat.id}: {audio_path}")
            self.add_sound(str(audio_path))

            beat_title = Text(beat.title, font_size=24, color=TEAL)
            beat_title.aquila_name = f"guided-title-{beat.id}"
            self.aquila.fit_width(beat_title, 0.72).to_edge(UP, buff=1.28)
            narration = Text(beat.narration, font_size=19, color=GREY_B)
            narration.aquila_name = f"guided-narration-{beat.id}"
            self.aquila.fit_width(narration, 0.78).to_edge(DOWN, buff=0.82)
            expression = MathTex(beat.expression, font_size=54, color=WHITE)
            expression.aquila_name = f"guided-expression-{beat.id}"
            self.aquila.fit(expression, 0.78, 0.29).move_to(UP * 0.50)
            calculation = MathTex(beat.calculation, font_size=34, color=YELLOW)
            calculation.aquila_name = f"guided-calculation-{beat.id}"
            self.aquila.fit(calculation, 0.82, 0.22).next_to(expression, DOWN, buff=0.55)
            explanation = Text(beat.explanation, font_size=21, color=BLUE_B)
            explanation.aquila_name = f"guided-explanation-{beat.id}"
            self.aquila.fit_width(explanation, 0.8).next_to(calculation, DOWN, buff=0.42)

            visual_time = 0.0
            self.play(FadeIn(beat_title, shift=RIGHT * 0.2), run_time=0.65)
            visual_time += 0.65
            self.play(FadeIn(narration, shift=UP * 0.15), run_time=0.65)
            visual_time += 0.65
            expression_time = max(1.6, min(4.0, beat.duration * 0.28))
            self.play(Write(expression), run_time=expression_time)
            visual_time += expression_time
            calculation_time = max(1.8, min(5.0, beat.duration * 0.34))
            self.play(Write(calculation), run_time=calculation_time)
            visual_time += calculation_time
            explanation_time = max(1.0, min(3.0, beat.duration * 0.18))
            self.play(FadeIn(explanation, shift=UP * 0.1), run_time=explanation_time)
            visual_time += explanation_time
            self.play(Circumscribe(expression, color=GOLD, time_width=0.9), run_time=0.9)
            visual_time += 0.9

            target_time = beat.guided_duration or (beat.audio_duration + 2.0) or (beat.duration + 2.0)
            self.wait(max(0.5, target_time - visual_time))
            self.wait(beat.pause_after)
            current_beat_group = [beat_title, narration, expression, calculation, explanation]

        self.finish_aquila()
        self.wait(2)
