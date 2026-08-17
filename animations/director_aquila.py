"""Director Maestro audiovisual de Zenit.

Este módulo no intenta adivinar la intención pedagógica. Impone un contrato
geométrico verificable para que cada escena tenga un lienzo seguro, legible y
consistente antes de producir un video publicable.
"""

from __future__ import annotations

from dataclasses import dataclass
from itertools import combinations
from typing import Iterable

from manim import Mobject, Scene, config

from animations.layout_engine import CanvasLayout, LayoutError, LayoutPlan, LayoutZone


@dataclass(frozen=True)
class SafeBox:
    name: str
    left: float
    right: float
    bottom: float
    top: float

    @property
    def width(self) -> float:
        return self.right - self.left

    @property
    def height(self) -> float:
        return self.top - self.bottom


@dataclass(frozen=True)
class LayoutIssue:
    level: str
    code: str
    message: str
    objects: tuple[str, ...] = ()


class AquilaError(RuntimeError):
    pass


class AquilaDirector:
    """Motor de layout seguro para escenas educativas 16:9."""

    def __init__(self, margin_ratio: float = 0.08, collision_tolerance: float = 0.06):
        self.frame_width = float(config.frame_width)
        self.frame_height = float(config.frame_height)
        self.margin_x = self.frame_width * margin_ratio
        self.margin_y = self.frame_height * margin_ratio
        self.collision_tolerance = collision_tolerance

    @property
    def frame(self) -> SafeBox:
        return SafeBox("frame", -self.frame_width / 2, self.frame_width / 2, -self.frame_height / 2, self.frame_height / 2)

    @property
    def safe(self) -> SafeBox:
        return SafeBox("safe", self.frame.left + self.margin_x, self.frame.right - self.margin_x, self.frame.bottom + self.margin_y, self.frame.top - self.margin_y)

    def zones(self) -> dict[str, SafeBox]:
        box = self.safe
        return {
            "title": SafeBox("title", box.left, box.right, box.top - 0.62, box.top),
            "content": SafeBox("content", box.left, box.right, box.bottom + 0.12, box.top - 0.78),
            "footer": SafeBox("footer", box.left, box.right, box.bottom, box.bottom + 0.36),
        }

    @staticmethod
    def bounds(mobject: Mobject) -> tuple[float, float, float, float]:
        points = mobject.get_all_points()
        if points is None or len(points) == 0:
            center = mobject.get_center()
            return center[0], center[0], center[1], center[1]
        return float(points[:, 0].min()), float(points[:, 0].max()), float(points[:, 1].min()), float(points[:, 1].max())

    def issues_for(self, mobjects: Iterable[Mobject]) -> list[LayoutIssue]:
        visible = []
        for m in mobjects:
            try:
                opacity = m.get_opacity()
            except AttributeError:
                opacity = 1
            if (opacity is None or opacity > 0) and m.get_num_points() > 0:
                visible.append(m)
        issues: list[LayoutIssue] = []
        safe = self.safe
        for mobject in visible:
            left, right, bottom, top = self.bounds(mobject)
            name = getattr(mobject, "aquila_name", mobject.__class__.__name__)
            if left < safe.left or right > safe.right or bottom < safe.bottom or top > safe.top:
                issues.append(LayoutIssue("error", "OUT_OF_SAFE_FRAME", f"{name} rebasa la zona segura 16:9: [{left:.2f}, {right:.2f}, {bottom:.2f}, {top:.2f}]", (name,)))
        for first, second in combinations(visible, 2):
            a = self.bounds(first)
            b = self.bounds(second)
            overlap_x = min(a[1], b[1]) - max(a[0], b[0])
            overlap_y = min(a[3], b[3]) - max(a[2], b[2])
            if overlap_x > self.collision_tolerance and overlap_y > self.collision_tolerance:
                first_name = getattr(first, "aquila_name", first.__class__.__name__)
                second_name = getattr(second, "aquila_name", second.__class__.__name__)
                issues.append(LayoutIssue("warning", "MOBJECT_COLLISION", f"Colisión geométrica entre {first_name} y {second_name}", (first_name, second_name)))
        return issues

    def assert_safe(self, mobject: Mobject, name: str | None = None) -> Mobject:
        if name:
            mobject.aquila_name = name
        issues = self.issues_for([mobject])
        errors = [issue for issue in issues if issue.level == "error"]
        if errors:
            raise AquilaError(errors[0].message)
        return mobject

    def fit_width(self, mobject: Mobject, max_width_ratio: float = 0.86) -> Mobject:
        max_width = self.frame_width * max_width_ratio
        if mobject.width > max_width:
            mobject.scale_to_fit_width(max_width)
        return mobject

    def fit_height(self, mobject: Mobject, max_height_ratio: float = 0.72) -> Mobject:
        max_height = self.frame_height * max_height_ratio
        if mobject.height > max_height:
            mobject.scale_to_fit_height(max_height)
        return mobject

    def fit(self, mobject: Mobject, max_width_ratio: float = 0.86, max_height_ratio: float = 0.72) -> Mobject:
        self.fit_width(mobject, max_width_ratio)
        self.fit_height(mobject, max_height_ratio)
        return mobject

    def resolve_layout(self, plan: LayoutPlan) -> dict[str, LayoutZone]:
        """Resuelve un layout pedagógico dentro de la zona segura."""
        try:
            return CanvasLayout(LayoutZone("safe", self.safe.left, self.safe.right, self.safe.bottom, self.safe.top)).zones(plan)
        except LayoutError as exc:
            raise AquilaError(str(exc)) from exc

    def fit_into_zone(self, mobject: Mobject, zone: LayoutZone, *, min_scale: float = 0.75, allow_compression: bool = True, horizontal_align: str = "center") -> Mobject:
        """Ajusta un grupo a una zona sin reducirlo silenciosamente sin límite."""
        try:
            return CanvasLayout.fit_group(mobject, zone, min_scale=min_scale, allow_compression=allow_compression, horizontal_align=horizontal_align)
        except LayoutError as exc:
            raise AquilaError(str(exc)) from exc

    def density_issues(self, mobjects: Iterable[Mobject], *, max_active_groups: int = 4, max_active_rows: int = 5) -> list[LayoutIssue]:
        """Audita carga visual básica en la zona de trabajo."""
        visible = []
        for m in mobjects:
            try:
                opacity = m.get_opacity()
            except AttributeError:
                opacity = 1
            if (opacity is None or opacity > 0) and m.get_num_points() > 0:
                visible.append(m)
        issues: list[LayoutIssue] = []
        if len(visible) > max_active_groups:
            names = tuple(getattr(m, "aquila_name", m.__class__.__name__) for m in visible)
            issues.append(LayoutIssue("warning", "ACTIVE_GROUP_DENSITY", f"Hay {len(visible)} grupos visibles; el plan admite {max_active_groups}.", names))
        if len(visible) > max_active_rows:
            names = tuple(getattr(m, "aquila_name", m.__class__.__name__) for m in visible)
            issues.append(LayoutIssue("warning", "ACTIVE_ROW_DENSITY", f"Hay {len(visible)} filas o grupos activos; el plan admite {max_active_rows}.", names))
        return issues


class AquilaScene(Scene):
    """Scene base: valida el layout después de cada animación y al finalizar."""

    def setup(self):
        super().setup()
        self.aquila = AquilaDirector()
        self.aquila_issues: list[LayoutIssue] = []

    def play(self, *args, **kwargs):
        result = super().play(*args, **kwargs)
        current = self.aquila.issues_for(self.mobjects)
        self.aquila_issues.extend(current)
        errors = [issue for issue in current if issue.level == "error"]
        if errors:
            raise AquilaError(errors[0].message)
        return result

    def aquila_check(self, *mobjects: Mobject):
        issues = self.aquila.issues_for(mobjects or self.mobjects)
        self.aquila_issues.extend(issues)
        errors = [issue for issue in issues if issue.level == "error"]
        if errors:
            raise AquilaError(errors[0].message)

    def aquila_density_check(self, *, max_active_groups: int = 4, max_active_rows: int = 5):
        issues = self.aquila.density_issues(self.mobjects, max_active_groups=max_active_groups, max_active_rows=max_active_rows)
        self.aquila_issues.extend(issues)
        return issues

    def finish_aquila(self):
        self.aquila_check(*self.mobjects)
