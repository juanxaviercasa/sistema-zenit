# Plan de implementación del video de muestra

**Proyecto:** Sistema Zenit  
**Rama:** `feature/scenespec-v2`  
**Muestra:** `Normalizar una ecuación cuadrática`  
**Objetivo:** producir un video pedagógico de demostración en español latinoamericano, con composición espacial dirigida, narración sincronizada y auditoría geométrica y pedagógica.

## 1. Alcance cerrado de la muestra

La primera muestra será el capítulo `normalization` del contrato SceneSpec v2. Contendrá dos beats y cinco microsteps: observación de la forma general, identificación de `a`, `b` y `c`, división de ambos miembros entre `a`, simplificación de cada término y traslado del término independiente.

La versión guiada será la referencia de calidad. El video conservará la ecuación original como ancla, mostrará el procedimiento activo en la columna izquierda y utilizará la columna derecha para una guía breve del paso actual. No se mostrará una transcripción completa de la voz. El objetivo es que el estudiante pueda mirar la operación, la razón y el resultado sin tener que leer un párrafo mientras escucha otro.

| Parámetro | Decisión de implementación |
|---|---|
| Duración esperada | Aproximadamente 2 minutos, determinada por los cinco clips TTS existentes y sus pausas pedagógicas |
| Resolución final | 1920 × 1080 |
| Frecuencia | 60 fps |
| Audio | WAV fuente de 48 kHz estéreo integrado en MP4 |
| Idioma | `es-419` |
| Layout dominante | `split` 60/40, con zona izquierda de procedimiento y zona derecha de guía |
| Ancla | Título del beat más ecuación original, compuestos en una banda superior estable |
| Memoria | Estado actual y estado anterior en tamaño legible; ancestros comprimidos en memoria secundaria |
| Cierre | Resultado estabilizado, mensaje breve y pausa final |

## 2. Contrato temporal de cada microstep

Cada microstep debe seguir una secuencia temporal verificable. La narración no se considera sincronizada solo porque el audio empiece junto con la escena: cada cue debe tener una relación observable con la frase que lo describe.

| Fase | Ventana orientativa | Acción visual |
|---|---:|---|
| Preparación | 0.0–0.5 s | Mantener el ancla y limpiar el apoyo anterior |
| Aparición | 0.5–2.5 s | Escribir o transformar el objeto matemático principal |
| Explicación | Según `audio:time` | Resaltar el término o la operación nombrada |
| Estabilización | Últimos 2–4 s | Dejar la expresión completa visible y retirar énfasis excesivo |
| Procesamiento | `pause_after` | No introducir contenido nuevo; permitir lectura |

Un clip de más de diez segundos debe tener varios cues temporales o debe dividirse en frases. El piloto actual ya declara cues en `audio:0.0`, `audio:3.0`, `audio:5.5`, `audio:3.6`, `audio:7.0` y `audio:5.3`; la escena debe ejecutar esos tiempos en vez de escribir toda la transformación al principio y dejarla estática.

## 3. Arquitectura de implementación

### Etapa A: contrato y auditoría previa

`SceneSpecV2` carga el JSON y valida estructura, archivos de audio, consistencia entre texto hablado y audio, cues visuales, pausas, layout, presupuesto de densidad y equivalencia simbólica con SymPy. Ningún render debe comenzar si existe un error estructural, una transformación no equivalente o un modo de layout desconocido.

### Etapa B: resolución espacial

`CanvasLayout` transforma `LayoutPlanSpec` en zonas físicas dentro de la caja segura 16:9. `linear` representa una cadena de pasos; `split` separa procedimiento y apoyo; `triad` se reserva para tres elementos cortos; `stacked` sirve para explicación conceptual; `reset` limpia la zona activa. Aquila rechaza un layout cuando una columna queda por debajo del ancho mínimo o cuando la expresión activa tendría que caer por debajo de su escala mínima.

### Etapa C: memoria matemática

`MathLedger` conserva el estado actual y el inmediatamente anterior con opacidades diferenciadas. Antes de reducir la ecuación actual, debe retirar, resumir o desplazar los ancestros. La memoria comprimida no puede competir con el estado activo ni cambiar el eje horizontal de una columna entre microsteps.

### Etapa D: dirección de la escena

La escena Manim crea el título, el encabezado del capítulo, el bloque ancla y las dos columnas. En cada microstep, crea la guía breve del motivo, coloca la expresión en la zona activa, añade el audio, ejecuta los cues en orden temporal, comprueba Aquila y aplica la política de retiro declarada.

### Etapa E: reproductor web

El reproductor web utiliza el mismo JSON público. El modo guiado reproduce todos los cues; el modo controlado permite avanzar por microstep y checkpoint; el modo práctica oculta el estado que el estudiante debe construir, pero conserva el ancla y las restricciones necesarias. El video de muestra se considera correcto solo si el contrato usado por el render y el contrato usado por el reproductor son idénticos.

## 4. Secuencia operativa reproducible

| Paso | Comando o acción | Criterio de salida |
|---:|---|---|
| 1 | Editar el JSON de SceneSpec | El contrato expresa layout, cues, audio y verificación |
| 2 | Copiar el JSON a `public/scenespec` | `cmp` confirma que la copia pública coincide |
| 3 | Ejecutar `research/validate_scenespec_v2.py` | `PASS`, 0 errores y 0 advertencias |
| 4 | Ejecutar preflight Aquila | Aspect ratio, assets, safe zones y geometría válidos |
| 5 | Ejecutar ESLint y TypeScript | Ambos comandos terminan con código 0 |
| 6 | Renderizar en baja resolución | El piloto termina sin excepciones y permite revisión visual |
| 7 | Auditar el render de prueba | No hay solapamientos, pared de texto ni eje inestable |
| 8 | Renderizar en 1080p60 | MP4 final con video 1920×1080 y 60 fps |
| 9 | Ejecutar postflight | Márgenes, duración, audio, frames y 16:9 válidos |
| 10 | Guardar reportes y publicar | Código, JSON, video y reportes quedan trazables |

## 5. Criterios de aceptación visual

El video se aceptará cuando el título del beat no toque la ecuación ancla; cuando el estado activo mantenga una escala mínima de 0.78 respecto a su tamaño base; cuando la columna derecha no supere tres o cuatro líneas de guía simultáneas; cuando solo exista un foco principal y un apoyo contextual; cuando el historial antiguo no fuerce el escalado del estado actual; y cuando cada transformación importante tenga una pausa posterior.

También se comprobará el comportamiento en una vista reducida. La guía derecha debe seguir siendo legible sin ampliar la pantalla, la separación entre columnas debe conservarse y ningún elemento debe acercarse al borde seguro. Una advertencia de baja resolución en el render de desarrollo no será considerada un fallo del sistema, pero sí deberá desaparecer en la entrega 1080p60.

## 6. Entregables finales

La implementación producirá el código del motor de layouts, el contrato SceneSpec validado, el JSON público sincronizado, el video MP4 de muestra, los reportes de preflight y postflight, una revisión visual del render y esta documentación. El video no se considerará terminado por el mero hecho de existir: debe estar respaldado por un contrato reproducible y por una auditoría que explique por qué cada elemento ocupa el lugar que ocupa.

> **Principio rector:** primero se decide qué debe ver el estudiante, después se asigna una zona, luego se sincroniza la narración y finalmente se permite a Manim renderizar. El orden inverso —escribir objetos y acomodarlos al final— es la causa principal de las superposiciones y de la pérdida de legibilidad.
