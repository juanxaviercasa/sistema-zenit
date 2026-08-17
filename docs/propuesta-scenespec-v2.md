# Propuesta SceneSpec v2 — Secuencia matemática controlable

## Objetivo

`SceneSpec v2` debe controlar una explicación desde la intención pedagógica hasta el frame final. La unidad mínima no será el beat completo ni el clip de audio, sino el **microstep**, definido como una transformación matemática observable, narrable y verificable.

La arquitectura propuesta responde a tres necesidades distintas:

| Necesidad | Mecanismo |
|---|---|
| Que cada frase tenga una aparición correspondiente | `AudioCue` y `VisualCue` alineados por intervalo temporal |
| Que los pasos se construyan unos sobre otros | `MathLedger` persistente con estados y relaciones |
| Que el estudiante pueda detenerse y comprobar | `Checkpoint`, pausa controlada y navegación por microstep |

## Jerarquía declarativa

```text
SceneSpec
└── Chapter
    └── Beat
        └── MicroStep
            ├── AudioCue
            ├── VisualCue
            ├── MathState
            ├── Verification
            ├── Checkpoint
            └── LayoutConstraints
```

### `SceneSpec`

Define la escena completa: objetivo, nivel, idioma, formato, prerequisitos, modos disponibles y política de segmentación.

### `Chapter`

Agrupa una intención pedagógica cerrada. Ejemplos: “Reconocer la forma general”, “Normalizar la ecuación”, “Completar el cuadrado” y “Aislar las raíces”. Cada capítulo debe poder reproducirse como un segmento independiente.

### `Beat`

Representa una idea didáctica, no una sola línea visual. Puede contener entre dos y ocho microsteps. El beat debe tener una pregunta guía y una condición de cierre.

### `MicroStep`

Es la unidad mínima de producción. Debe declarar el estado anterior, el estado posterior, la operación, la justificación verbal, el objetivo visual, la señalización y la pausa.

## Contrato mínimo de un MicroStep

```json
{
  "id": "normalize-02",
  "from_state": "a*x^2 + b*x + c = 0",
  "to_state": "x^2 + (b/a)*x + c/a = 0",
  "operation": "divide_both_sides",
  "reason": "a != 0, so divide every term by a",
  "spoken_text": "Como a no es cero, dividimos cada término entre a.",
  "audio": {
    "file": "audio/formula-general/normalize-02.wav",
    "start": 0.0,
    "duration": 4.8,
    "rate_wpm": 148
  },
  "visual": [
    {"action": "highlight", "target": "coefficient-a", "when": "audio:0.0"},
    {"action": "write", "target": "normalized-left", "when": "audio:1.0"},
    {"action": "write", "target": "normalized-right", "when": "audio:3.0"}
  ],
  "pause_after": 1.6,
  "ledger": {
    "keep_previous": true,
    "previous_opacity": 0.38,
    "stack_position": "below",
    "show_operation_badge": true
  },
  "verification": {
    "type": "symbolic_equivalence",
    "engine": "sympy",
    "expected": "equivalent_under_assumption:a!=0"
  },
  "checkpoint": {
    "type": "observe",
    "prompt": "¿Qué cambió en cada término al dividir entre a?",
    "required_before_continue": false
  }
}
```

## `MathLedger`: acumulación sobre estados anteriores

La modalidad guiada no debe borrar la ecuación anterior por defecto. El ledger mantiene una pila de estados:

| Estado | Visualización | Uso pedagógico |
|---|---|---|
| `current` | Opacidad 1.0, color activo | Transformación que se está explicando |
| `previous` | Opacidad 0.35–0.50 | Comparar con el paso inmediatamente anterior |
| `ancestor` | Opacidad 0.12–0.25 o miniatura lateral | Mantener contexto sin saturar la pantalla |
| `verified` | Marca de validación | Confirmar que la igualdad fue revisada |
| `recalled` | Reaparece temporalmente | Recordar una regla o definición previa |

En escenas con muchas líneas, el ledger puede comprimir estados anteriores a una columna lateral o a un historial vertical. La compresión nunca debe eliminar el vínculo: cada línea debe conservar un identificador que permita resaltarla cuando la narración diga “en el paso anterior”.

## Sincronización audio–visual

La pista TTS no debe ser la única unidad de sincronización. Cada audio debe tener una alineación de cláusulas o cues. Se admiten dos estrategias:

| Estrategia | Ventaja | Uso recomendado |
|---|---|---|
| Clips TTS por microstep | Fácil de renderizar y auditar | Primera implementación de SceneSpec v2 |
| Un clip por beat con marcas internas | Menos archivos y mejor continuidad | Fase posterior, cuando exista alineación confiable |

El generador debe bloquear un microstep cuando la voz mencione una expresión que todavía no está visible. Debe emitir un hallazgo `AUDIO_VISUAL_DESYNC` si un cue verbal no tiene un objetivo visual o si el objetivo aparece antes de la cláusula correspondiente.

## Modos pedagógicos

### Tutor guiado

Es el modo para estudiantes con poco conocimiento previo. Presenta la solución completa, pero en pasos pequeños. Cada microstep sigue el ciclo:

```text
Contexto → Pregunta → Regla → Transformación → Verificación → Pausa
```

La pausa final puede ser automática o depender del botón “Continuar”. El estado previo permanece en el ledger para evitar que el estudiante deba memorizar la ecuación.

### Tutor controlado

Es una variante del modo guiado en la que cada capítulo puede detenerse después de un checkpoint. El estudiante puede repetir el audio, repetir la animación, mostrar la justificación o continuar.

### Práctica guiada

Está diseñada para estudiantes con mayor conocimiento previo. Muestra el estado anterior y la regla, oculta una parte del estado posterior y pide completarla. Después revela la solución y explica el error más frecuente.

### Presentación elegante

Organiza los mismos capítulos en diapositivas, pero cada diapositiva se construye con microsteps. No debe convertirse en una sucesión de pantallas desconectadas: las transiciones `morph` deben conservar los objetos matemáticos compartidos y la navegación debe incluir capítulos y progreso.

## Auditoría pedagógica nueva

El auditor debe añadir controles que Aquila todavía no posee.

| Regla | Código de hallazgo sugerido |
|---|---|
| Cada microstep tiene estado anterior y posterior | `MISSING_STATE_TRANSITION` |
| El estado posterior es equivalente o se justifica la no equivalencia | `SYMBOLIC_VERIFICATION_FAILED` |
| La voz tiene un cue visual correspondiente | `AUDIO_VISUAL_DESYNC` |
| No se introducen demasiados conceptos a la vez | `CONCEPT_DENSITY_HIGH` |
| La narración no supera la velocidad configurada | `SPEECH_RATE_HIGH` |
| Hay una pausa después de una transformación difícil | `PROCESSING_PAUSE_MISSING` |
| La pantalla conserva contexto sin superar el límite visual | `LEDGER_OVERLOAD` |
| La acción y su objetivo no se contradicen | `ACTION_TARGET_MISMATCH` |
| Un paso no aparece antes de que se explique su regla | `PREMATURE_REVEAL` |
| Un paso desaparece sin instrucción pedagógica | `UNEXPLAINED_ERASURE` |
| El capítulo tiene condición de cierre | `MISSING_CHAPTER_CLOSE` |
| El estudiante puede repetir o avanzar | `NO_LEARNER_CONTROL` |

## Métricas de calidad

El informe de cada escena debe producir métricas legibles:

| Métrica | Fórmula o criterio |
|---|---|
| Densidad de microsteps | `microsteps / minute` |
| Densidad de conceptos | `new_concepts / microstep` |
| Cobertura de señalización | `cues con target / cues verbales` |
| Cobertura de verificación | `microsteps verificados / microsteps totales` |
| Persistencia de contexto | porcentaje de estados con ancestro visible |
| Pausa de procesamiento | segundos promedio después de transformaciones |
| Velocidad de voz | palabras por minuto por microstep |
| Control del estudiante | porcentaje de checkpoints navegables |
| Ratio de aparición prematura | objetivos visibles antes de su cue |
| Ratio de eliminación no explicada | estados borrados sin acción declarada |

## Piloto recomendado

No se debe rehacer todavía el video completo de 314 segundos. El primer experimento debe ser un clip de 60–90 segundos sobre la normalización de la ecuación cuadrática.

El piloto debe producir tres variantes con el mismo contenido:

| Variante | Objetivo de prueba |
|---|---|
| `guided-ledger` | Validar acumulación vertical de ecuaciones y sincronía por microstep |
| `guided-controlled` | Medir la utilidad de detenerse y continuar manualmente |
| `practice-completion` | Evaluar si ocultar el siguiente paso mejora la participación |

El piloto se considerará aprobado solo si cumple simultáneamente: cero errores de verificación simbólica, cero `AUDIO_VISUAL_DESYNC`, cero `PREMATURE_REVEAL`, cero `UNEXPLAINED_ERASURE`, postflight 16:9 limpio y revisión visual humana favorable.

## Decisión de implementación

La primera implementación de SceneSpec v2 debe usar **un clip TTS por microstep**, no alineación forzada palabra por palabra. Esto reduce la complejidad y permite verificar el principio fundamental: cada narración corta corresponde a una sola transformación visible. Cuando el contrato esté validado con el piloto, se podrá automatizar la generación de clips desde el guion y consolidarlos en una pista continua.
