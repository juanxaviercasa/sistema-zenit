"""Motor declarativo de composición para escenas educativas 16:9.

El motor no decide el contenido matemático. Resuelve una intención espacial
(`linear`, `split`, `triad`, `stacked`) dentro de la zona segura de Aquila y
rechaza configuraciones que obligarían a reducir la expresión activa a un
 tamaño ilegible.
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import StrEnum

from manim import LEFT, RIGHT, Mobject, VGroup


class LayoutMode(StrEnum):
    LINEAR = "linear"
    SPLIT = "split"
    TRIAD = "triad"
    STACKED = "stacked"
    RESET = "reset"


@dataclass(frozen=True)
class LayoutZone:
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

    @property
    def center_x(self) -> float:
        return (self.left + self.right) / 2

    @property
    def center_y(self) -> float:
        return (self.bottom + self.top) / 2


@dataclass(frozen=True)
class LayoutPlan:
    mode: LayoutMode | str = LayoutMode.LINEAR
    gap: float = 0.34
    min_scale: float = 0.75
    max_active_groups: int = 4
    max_active_rows: int = 5
    keep_anchor: bool = True
    allow_compression: bool = True

    def __post_init__(self) -> None:
        object.__setattr__(self, "mode", LayoutMode(self.mode))


class LayoutError(ValueError):
    """Configuración espacial incompatible con la legibilidad mínima."""


class CanvasLayout:
    """Calcula zonas pedagógicas dentro de un lienzo seguro de Aquila."""

    def __init__(self, safe_zone: LayoutZone):
        self.safe_zone = safe_zone

    def zones(self, plan: LayoutPlan) -> dict[str, LayoutZone]:
        box = self.safe_zone
        if plan.mode is LayoutMode.RESET:
            return {"active": box}

        header_height = min(0.82, box.height * 0.14)
        anchor_height = min(1.18, box.height * 0.2) if plan.keep_anchor else 0.0
        footer_height = min(0.54, box.height * 0.09)
        body_bottom = box.bottom + footer_height
        body_top = box.top - header_height - anchor_height - plan.gap
        header = LayoutZone("header", box.left, box.right, box.top - header_height, box.top)
        anchor = LayoutZone("anchor", box.left, box.right, body_top + plan.gap, body_top + plan.gap + anchor_height)
        active = LayoutZone("active", box.left, box.right, body_bottom, body_top)

        if plan.mode in {LayoutMode.LINEAR, LayoutMode.STACKED}:
            return {"header": header, "anchor": anchor, "active": active, "footer": LayoutZone("footer", box.left, box.right, box.bottom, body_bottom)}

        if plan.mode is LayoutMode.SPLIT:
            available = active.width - plan.gap
            left_width = available * 0.60
            right_width = available - left_width
            if min(left_width, right_width) < 4.5:
                raise LayoutError(f"split requiere dos columnas de al menos 4.5 unidades; disponibles: {left_width:.2f}/{right_width:.2f}")
            return {
                "header": header,
                "anchor": anchor,
                "active": active,
                "left": LayoutZone("left", active.left, active.left + left_width, active.bottom, active.top),
                "right": LayoutZone("right", active.left + left_width + plan.gap, active.right, active.bottom, active.top),
                "footer": LayoutZone("footer", box.left, box.right, box.bottom, body_bottom),
            }

        if plan.mode is LayoutMode.TRIAD:
            available = active.width - 2 * plan.gap
            width = available / 3
            if width < 3.4:
                raise LayoutError(f"triad requiere tres columnas de al menos 3.4 unidades; disponibles: {width:.2f}")
            return {
                "header": header,
                "anchor": anchor,
                "active": active,
                "left": LayoutZone("left", active.left, active.left + width, active.bottom, active.top),
                "center": LayoutZone("center", active.left + width + plan.gap, active.left + 2 * width + plan.gap, active.bottom, active.top),
                "right": LayoutZone("right", active.right - width, active.right, active.bottom, active.top),
                "footer": LayoutZone("footer", box.left, box.right, box.bottom, body_bottom),
            }

        raise LayoutError(f"modo de layout desconocido: {plan.mode}")

    @staticmethod
    def fit_group(group: VGroup, zone: LayoutZone, *, min_scale: float = 0.75, allow_compression: bool = True, horizontal_align: str = "center") -> VGroup:
        if group.width <= 0 or group.height <= 0:
            return group
        target_width = zone.width * 0.92
        target_height = zone.height * 0.88
        width_scale = target_width / group.width
        height_scale = target_height / group.height
        scale = min(1.0, width_scale, height_scale)
        if scale < min_scale and not allow_compression:
            raise LayoutError(f"{group} no cabe en {zone.name} sin caer por debajo de escala mínima {min_scale}")
        group.scale(scale)
        group.move_to((zone.center_x, zone.center_y, 0))
        if horizontal_align == "left":
            group.align_to((zone.left + zone.width * 0.04, zone.center_y, 0), LEFT)
        elif horizontal_align == "right":
            group.align_to((zone.right - zone.width * 0.04, zone.center_y, 0), RIGHT)
        return group

    @staticmethod
    def arrange_rows(mobjects: list[Mobject], zone: LayoutZone, gap: float = 0.34) -> VGroup:
        group = VGroup(*mobjects)
        group.arrange(direction=(0, -1, 0), buff=gap, aligned_edge=(-1, 0, 0))
        return CanvasLayout.fit_group(group, zone)
