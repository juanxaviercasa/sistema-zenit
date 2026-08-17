# Pipeline audiovisual Zenit y Director Maestro Aquila

## Propósito

Cada video educativo debe pasar por tres filtros: **preflight**, render controlado y **postflight**. El objetivo es bloquear errores recurrentes de composición, como fórmulas fuera del lienzo, títulos superpuestos, gráficos que rompen el formato 16:9, resoluciones insuficientes o frames completamente vacíos en mitad de una explicación.

`animations/director_aquila.py` contiene el contrato geométrico que usan las escenas. `AquilaScene` valida el estado de los mobjects después de cada animación y al terminar la escena. La clase `AquilaDirector` define la relación 16:9, la zona segura, las zonas de título/contenido/pie y funciones `fit_width`, `fit_height` y `fit` para reducir automáticamente fórmulas o textos que excedan el límite.

## Flujo recomendado

```bash
# 1. Auditoría estática de diseño
python3 animations/aquila_cli.py preflight \
  animations/manim/formula_general.py \
  --report reports/formula-general-preflight.json

# 2. Render de producción 16:9
manim -qh --format=mp4 \
  --media_dir public/media/zenit \
  animations/manim/formula_general.py FormulaGeneral

# 3. Auditoría del video exportado
python3 animations/aquila_cli.py postflight \
  public/media/zenit/videos/formula_general/1080p60/FormulaGeneral.mp4 \
  --report reports/formula-general-postflight.json
```

El preflight devuelve `FAIL` cuando la escena no usa `AquilaScene`, no ejecuta `finish_aquila()` o no dispone de ningún mecanismo de ajuste automático. El postflight devuelve `FAIL` cuando el video no respeta 16:9, contiene frames negros internos o presenta otro incumplimiento crítico. Las advertencias —por ejemplo una transición negra inicial, baja resolución de desarrollo o un margen muy estrecho— deben resolverse antes de publicar, aunque no siempre bloquean una iteración local.

## Reglas del Ojo de Águila

| Regla | Criterio |
|---|---|
| Formato | Relación 16:9 con tolerancia de 1.5% |
| Producción | Objetivo mínimo 1280×720; preferido 1920×1080 |
| Zona segura | Margen geométrico interno para títulos, fórmulas y gráficos |
| Colisiones | Intersección de bounding boxes superior a la tolerancia definida |
| Tipografía | Todo `Text` y `MathTex` debe poder ajustarse a la zona segura |
| Transiciones | Frames negros permitidos solo al inicio o final, nunca en mitad del video |
| Accesibilidad | Cada video debe acompañarse de transcripción o subtítulos |
| Publicación | Solo se copian assets cuyo postflight sea `PASS` o haya sido aprobado explícitamente |

## Escena piloto

`animations/manim/formula_general.py` muestra el patrón recomendado: hereda de `AquilaScene`, asigna nombres auditables a los objetos, ajusta textos y fórmulas con `fit_width` y llama a `finish_aquila()` antes del cierre.

La auditoría no sustituye la revisión pedagógica ni la revisión visual humana. Funciona como un **ojo de águila automatizado**: bloquea fallos medibles y deja un informe con evidencia para que el equipo pueda corregir la composición antes de publicar.

## SceneSpec: un guion antes de animar

`animations/scenespec.py` define un contrato declarativo para cada explicación. El archivo JSON de `animations/specs/formula_general.json` describe el objetivo, los beats, la expresión visible, el cálculo que debe mostrarse, la justificación, la pausa posterior, el número de unidades visuales y la acción que se espera del estudiante. El contenido matemático se escribe una sola vez y se reutiliza en las dos modalidades.

Antes de renderizar se ejecuta:

```bash
python3 animations/aquila_cli.py spec-audit \
  animations/specs/formula_general.json \
  --report reports/formula-general-scenespec.json
```

La auditoría calcula la duración estimada de cada modo y bloquea beats demasiado cortos, acumulaciones de conceptos, densidad visual excesiva, transiciones desconocidas, pausas insuficientes o pasos que no expliquen qué cambió y qué debe observar el estudiante.

## Dos modalidades del mismo contenido

| Modalidad | Objetivo | Comportamiento |
|---|---|---|
| **Demostración guiada** | Enseñar el procedimiento | Muestra título, narración, fórmula, cálculo, explicación, énfasis y pausa en cada microtransformación |
| **Presentación elegante** | Exponer o dar una clase | Organiza los mismos beats como diapositivas, usa fragmentos, transiciones `fade`, `morph`, `zoom` y `slide`, numeración y barra de progreso |

La demostración guiada está implementada en `animations/manim/formula_general_guiada.py`; ahora utiliza una pista TTS neural por beat y tarda aproximadamente 314 segundos en calidad de producción. La presentación está implementada en `animations/manim/formula_general_presentacion.py`; tarda aproximadamente 59 segundos y prioriza una exposición visual con ritmo cinematográfico. Ninguna de las dos salta directamente al resultado: el SceneSpec obliga a declarar los pasos intermedios.

Los assets publicados y su manifiesto son:

```text
public/media/zenit/formula-general-guiada.mp4
public/media/zenit/formula-general-guiada-tts.json
public/media/zenit/formula-general-presentacion.mp4
public/media/zenit/formula-general-manifest.json
audio/formula-general/beat-01.wav ... beat-07.wav
```

El piloto final quedó validado con `PASS` en ambos postflight: 1920×1080, 60 fps, 16:9 y cero hallazgos críticos o advertencias de margen. La versión guiada narrada contiene una pista AAC estéreo a 48 kHz y fue verificada mediante transcripción automática.
