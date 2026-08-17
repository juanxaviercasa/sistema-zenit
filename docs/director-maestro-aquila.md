# Director Maestro Audiovisual Aquila

## Qué resuelve

El **Director Maestro Aquila** es el ojo de águila del pipeline audiovisual de Zenit. No reemplaza la creatividad del autor ni la revisión pedagógica; convierte los errores visuales más frecuentes en reglas ejecutables. Antes de publicar una animación, verifica que la escena use una base segura, que los objetos respeten el lienzo 16:9, que las fórmulas puedan ajustarse, que no existan colisiones geométricas y que el video final tenga formato, resolución y cobertura visual aceptables.

## Arquitectura

| Fase | Componente | Responsabilidad |
|---|---|---|
| Preflight | `animations/aquila_cli.py preflight` | Revisa que la escena use `AquilaScene`, ajuste objetos y ejecute el cierre de auditoría |
| Dirección en escena | `animations/director_aquila.py` | Define frame, zona segura, zonas de título/contenido/pie, bounding boxes y colisiones |
| Render | Manim Community | Produce el video únicamente después de superar el preflight |
| Postflight | `animations/aquila_cli.py postflight` | Usa `ffprobe`, `ffmpeg` y análisis de frames para revisar 16:9, resolución, bordes y vacíos |
| Evidencia | `reports/*.json` | Conserva los datos y hallazgos de cada auditoría |

## Contrato de diseño

Una escena Zenit debe heredar de `AquilaScene`. Cada objeto relevante debería recibir un `aquila_name`, y cada texto o fórmula debe pasar por `fit_width`, `fit_height` o `fit`. Antes de terminar la escena se debe llamar a `finish_aquila()`.

La zona segura parte de un margen interno del lienzo y se divide conceptualmente en tres áreas: título, contenido y pie. El Director Maestro inspecciona los bounding boxes de los mobjects visibles después de cada `play`. Las colisiones superiores a la tolerancia se registran como advertencias; los desbordamientos de la zona segura detienen el render.

El postflight revisa cinco frames distribuidos por el video, no solo el primer instante. Un frame negro puede existir como transición inicial o final, pero un frame vacío interno es un error. El video de producción debe ser 16:9 y tener al menos 1280×720; la calidad recomendada es 1920×1080.

## Piloto auditado

La escena `animations/manim/formula_general.py` fue migrada a `AquilaScene`, con ajuste automático del título y de las expresiones matemáticas. Se renderizó en calidad de producción y se aplicaron los dos gates.

| Evidencia | Resultado |
|---|---|
| Preflight de escena | `PASS` |
| Resolución | 1920×1080 |
| Relación de aspecto | 16:9 |
| Frecuencia | 60 fps |
| Duración | 9 segundos |
| Postflight | `PASS` |
| Asset | `public/media/zenit/formula-general.mp4` |

> Resultado del piloto: **el video fue generado y aprobado automáticamente por Aquila**.

## Comandos

```bash
python3 animations/aquila_cli.py preflight \
  animations/manim/formula_general.py \
  --report reports/formula-general-preflight.json

manim -qh --format=mp4 \
  --media_dir public/media/zenit \
  animations/manim/formula_general.py FormulaGeneral

python3 animations/aquila_cli.py postflight \
  public/media/zenit/formula-general.mp4 \
  --report reports/formula-general-postflight.json
```

El pipeline está preparado para que el siguiente paso sea añadir un `SceneSpec` declarativo con guion, niveles de título, anclajes de fórmulas, zonas reservadas para gráficos y duración por beat. Eso permitirá que el Director Maestro audite no solo geometría, sino también ritmo, densidad de información y continuidad pedagógica entre escenas.
