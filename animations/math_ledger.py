from __future__ import annotations

from dataclasses import dataclass
from typing import Iterable

from manim import DOWN, LEFT, RIGHT, Mobject, VGroup

from animations.layout_engine import CanvasLayout, LayoutZone


@dataclass
class LedgerEntry:
    id: str
    state: str
    mobject: Mobject
    role: str = "previous"
    generation: int = 0


class MathLedger:
    """Historial visual acumulativo para derivaciones matemáticas."""

    def __init__(self, scene, anchor, width: float = 10.4, max_height: float = 3.25, row_gap: float = 0.42):
        self.scene = scene
        self.anchor = anchor
        self.width = width
        self.max_height = max_height
        self.row_gap = row_gap
        self.entries: list[LedgerEntry] = []
        self.generation = 0

    @property
    def current(self) -> LedgerEntry | None:
        return self.entries[-1] if self.entries else None

    def _set_opacity(self) -> None:
        for index, entry in enumerate(self.entries):
            if index == len(self.entries) - 1:
                entry.role = "current"
                entry.mobject.set_opacity(1.0)
            elif index == len(self.entries) - 2:
                entry.role = "previous"
                entry.mobject.set_opacity(0.42)
            else:
                entry.role = "ancestor"
                entry.mobject.set_opacity(0.18)

    def _layout(self) -> None:
        if not self.entries:
            return
        group = VGroup(*(entry.mobject for entry in self.entries))
        group.arrange(DOWN, buff=self.row_gap, aligned_edge=LEFT)
        group.move_to(self.anchor)
        if group.width > self.width:
            group.scale_to_fit_width(self.width)
        if group.height > self.max_height:
            group.scale_to_fit_height(self.max_height)
        group.align_to(self.anchor, LEFT)

    def reveal(self, entry_id: str, state: str, mobject: Mobject, *, animate=None, run_time: float = 1.4, layout_zone: LayoutZone | None = None, keep_visible: int = 2, min_scale: float = 0.75, allow_compression: bool = False, gap: float | None = None) -> Mobject:
        """Añade un estado nuevo y conserva los anteriores como contexto."""
        self.generation += 1
        mobject.aquila_name = f"ledger-{entry_id}"
        self.entries.append(LedgerEntry(entry_id, state, mobject, generation=self.generation))
        self._set_opacity()
        if layout_zone is None:
            self._layout()
        else:
            self.layout_recent(layout_zone, keep=keep_visible, min_scale=min_scale, allow_compression=allow_compression, gap=self.row_gap if gap is None else gap)
        if animate is not None:
            self.scene.play(animate(mobject), run_time=run_time)
        else:
            self.scene.add(mobject)
        self._set_opacity()
        if layout_zone is None:
            self._layout()
        else:
            self.layout_recent(layout_zone, keep=keep_visible, min_scale=min_scale, allow_compression=allow_compression, gap=self.row_gap if gap is None else gap)
        return mobject

    def highlight(self, entry_id: str, color, run_time: float = 0.8) -> None:
        for entry in self.entries:
            if entry.id == entry_id:
                self.scene.play(entry.mobject.animate.set_color(color), run_time=run_time)
                return

    def remove_ancestors(self, keep: int = 2, run_time: float = 0.8) -> None:
        """Comprime solo el historial antiguo; nunca elimina el estado actual."""
        if len(self.entries) <= keep:
            return
        old = self.entries[:-keep]
        self.entries = self.entries[-keep:]
        self._set_opacity()
        self._layout()
        self.scene.play(*[entry.mobject.animate.set_opacity(0) for entry in old], run_time=run_time)
        self.scene.remove(*[entry.mobject for entry in old])

    def layout_recent(self, zone: LayoutZone, *, keep: int = 2, min_scale: float = 0.75, allow_compression: bool = False, gap: float = 0.34) -> VGroup:
        """Coloca solo los estados recientes en el área activa.

        Los ancestros siguen existiendo en el ledger y quedan atenuados, pero
        no obligan a reducir el estado actual. El caller puede decidir luego
        si los resume o los retira con ``remove_ancestors``.
        """
        recent = self.entries[-keep:] if keep > 0 else []
        if not recent:
            return VGroup()
        group = VGroup(*(entry.mobject for entry in recent))
        group.arrange(DOWN, buff=gap, aligned_edge=LEFT)
        CanvasLayout.fit_group(group, zone, min_scale=min_scale, allow_compression=allow_compression, horizontal_align="left")
        older = self.entries[:-keep]
        if older:
            memory = VGroup(*(entry.mobject for entry in older))
            memory.arrange(RIGHT, buff=0.12)
            memory.set_opacity(0.18)
            memory.scale_to_fit_width(min(zone.width * 0.72, max(1.2, zone.width)))
            memory.move_to((zone.center_x, zone.bottom + min(0.28, zone.height * 0.08), 0))
        self._set_opacity()
        return group

    def group(self) -> VGroup:
        return VGroup(*(entry.mobject for entry in self.entries))

    def states(self) -> list[str]:
        return [entry.state for entry in self.entries]

    def ids(self) -> list[str]:
        return [entry.id for entry in self.entries]

    def assert_persistent(self, expected_minimum: int = 2) -> None:
        if len(self.entries) < expected_minimum:
            raise RuntimeError(f"MathLedger esperaba al menos {expected_minimum} estados, encontró {len(self.entries)}")
