# Auditoría audiovisual comparativa de canales de matemáticas — Sistema Zenit

**Fecha:** 2026-08-17  
**Propósito:** entender por qué las explicaciones audiovisuales de canales con marca consolidada se perciben más claras que el piloto actual de SceneSpec v2 y traducir sus decisiones de composición a reglas implementables.

> **Diagnóstico central:** el piloto actual tiene un ledger acumulativo, pero todavía no tiene una dirección espacial pedagógica. Conserva estados, pero los apila en una sola columna, reduce el grupo completo cuando crece y deja la narración como un bloque inferior independiente. Los canales analizados no conservan todo con el mismo peso: mantienen un ancla, amplían el área activa, abren columnas solo cuando la operación lo exige y limpian o desplazan la información cuando deja de ser útil.

## 1. Muestra y método

Se analizaron seis videos representativos mediante inspección de sus páginas públicas y análisis audiovisual por intervalos: composición, uso del lienzo, zonas, columnas, escala, color, aparición progresiva, sincronía voz-escritura, señalamiento, persistencia y limpieza. La muestra combina canales hispanos de explicación procedural con un referente internacional de visualización conceptual.

| Canal | Video analizado | Función comparativa |
|---|---|---|
| [JulioProfe](https://www.youtube.com/watch?v=qeKEA066OSs) | *Ecuaciones lineales o de primer grado \| Ej. 1 → 3* | Pizarra lineal, anclaje superior, reset entre ejercicios y señalamiento físico |
| [Matemáticas profe Alex](https://www.youtube.com/watch?v=BxrJmKdPHRs) | *Ecuación cuadrática por fórmula general \| Ejemplo 1* | Dos columnas, extracción de coeficientes, sustitución progresiva y bifurcación de resultados |
| [Daniel Carreón](https://www.youtube.com/watch?v=IHblqjW8RY8) | *Ecuaciones de primer grado* | Reducción para principiantes, resolución 60/40 y verificación condicional |
| [Math2me](https://www.youtube.com/watch?v=hAL4hx26n60) | *Intro a las ecuaciones cuadráticas* | Encabezado persistente, zona inferior dinámica, menú de métodos y limpieza por ejemplo |
| [Matemáticas con Juan](https://www.youtube.com/watch?v=2mS5Bi0t1K8) | *¡Cuidado con esta ecuación de primer grado!* | Error común, disonancia cognitiva, corrección visible y verificación |
| [3Blue1Brown](https://www.youtube.com/watch?v=MHXO86wKeDY) | *The simpler quadratic formula* | Contraste conceptual: anclas persistentes, aumento gradual de densidad y transformación algebraico-geométrica |

La página pública de Profe Alex identifica el ejemplo como parte de un curso completo, con 9.3 millones de visualizaciones visibles en la consulta y otros episodios de 5:55, 9:18 y 10:35 en la misma serie. [1] La página de JulioProfe presenta el video de tres ecuaciones con capítulos en 0:00, 0:29, 1:28 y 3:10, una segmentación que coincide con el patrón de reinicio entre ejercicios. [2] Los canales de Daniel Carreón y JulioProfe también muestran una marca educativa que se extiende a libros, webs, documentos, aplicaciones, cursos o redes sociales; por eso la composición de cada video debe entenderse como parte de una gramática de marca repetible, no como una escena aislada. [3] [4]

## 2. Qué hacen mejor que el piloto actual

### 2.1 El lienzo tiene una arquitectura, no una pila

Los seis casos organizan el espacio según funciones cognitivas. Una zona contextualiza, otra ejecuta y otra compara, verifica o resume. Incluso cuando la pizarra es una sola superficie, existe una división invisible entre ancla y área activa.

| Patrón observado | Ejemplos | Efecto sobre el estudiante | Falta actual en Zenit |
|---|---|---|---|
| Ancla superior o lateral que no se mueve | JulioProfe, Math2me, 3Blue1Brown | Mantiene la pregunta o la regla disponible sin competir con el paso activo | El piloto mezcla título, beat y ledger dentro de un único eje vertical |
| Dos columnas condicionales | Profe Alex, Daniel Carreón | Permite comparar problema/proceso, resolución/verificación o raíz 1/raíz 2 | Aquila solo detecta colisiones; no decide cuándo una segunda columna mejora la comprensión |
| Tres columnas solo para una bifurcación breve | Profe Alex en resultados o extracción de datos | Hace visibles alternativas paralelas sin reescribir toda la explicación | No existe presupuesto de ancho ni regla de prohibición cuando las fórmulas son largas |
| Limpieza parcial de la zona activa | Math2me, Matemáticas con Juan | Libera memoria de trabajo sin perder el marco conceptual | MathLedger conserva estados, pero no distingue contexto persistente de trabajo descartable |
| Reset completo entre ejercicios | JulioProfe, Math2me | Marca el cierre y evita mezclar problemas | El ledger de la escena piloto atraviesa beats y reduce el grupo completo en lugar de reiniciar por capítulo o ejercicio |

### 2.2 El estado actual no debe conservarse con el mismo tamaño

El MathLedger del piloto es correcto como principio de memoria acumulativa, pero su política actual es geométricamente ingenua: todas las ecuaciones permanecen dentro de un `VGroup`, se apilan verticalmente y el grupo completo se escala cuando excede `max_height`. Esto produce el efecto contrario al de los referentes: el estado actual pierde tamaño precisamente cuando más necesita ser leído.

La solución no es borrar el ledger, sino separar tres categorías:

1. **Ancla:** problema, forma general, regla o variable que seguirá siendo referenciada. Permanece en una zona estable.
2. **Trabajo activo:** transformación actual y, como máximo, el estado inmediatamente anterior a una escala suficientemente grande para comparar.
3. **Memoria comprimida:** estados antiguos convertidos en una tira lateral, mini-historial o etiqueta de operación; no deben ocupar el mismo ancho ni la misma altura que la ecuación activa.

### 2.3 La voz no debe hablar durante una imagen estática

En el piloto actual cada microstep tiene un clip TTS de 14–25 segundos, pero la expresión se escribe durante aproximadamente 0.9–2.8 segundos y luego queda estática mientras continúa casi toda la narración. La unidad declarativa es correcta, pero la unidad temporal sigue siendo demasiado grande. Los canales analizados muestran una relación más fina: la voz menciona un término, el término aparece o se señala; la voz explica la operación, la operación se representa; la voz concluye, el resultado se estabiliza.

Por ello, un `MicroStep` debe poder contener **microeventos temporales internos**. No basta con `visual[]` como lista descriptiva: cada cue debe tener una ventana relativa al audio, un objetivo y una acción verificable. Si no hay marcas de tiempo fiables, el generador debe dividir el texto y el TTS en frases de 3–8 segundos en lugar de reproducir un clip largo con una sola transformación inicial.

## 3. Hallazgos por canal

### JulioProfe: linealidad y reset cognitivo

JulioProfe utiliza una arquitectura deliberadamente lineal. Primero presenta un pequeño menú de ejercicios; después fija la ecuación original en la parte superior y hace descender los pasos en filas. El señalamiento manual prepara la operación antes de que el siguiente renglón aparezca. Al terminar un ejercicio, la pizarra se limpia: la limpieza es una frontera cognitiva, no un defecto de continuidad.

**Regla transferible:** cuando el razonamiento es una cadena única, usar una columna principal con máximo cuatro o cinco filas legibles; mantener la expresión origen arriba; después de la conclusión y una pausa de procesamiento, limpiar la zona activa antes del siguiente ejercicio.

### Matemáticas profe Alex: dos columnas y sustitución por capas

Profe Alex ofrece el ejemplo más importante para el problema actual. El espacio se divide entre declaración/datos y procedimiento, y luego se vuelve a dividir para los dos resultados de la fórmula cuadrática. La sustitución no ocurre de una sola vez: primero aparece la estructura con paréntesis vacíos y después se rellenan los coeficientes. La pantalla solo abre la bifurcación cuando la ecuación ya está preparada para ella.

**Regla transferible:** una segunda columna debe abrirse por necesidad semántica —comparar, verificar o bifurcar— y no para exprimir más contenido. La sustitución debe tener estados intermedios visibles. Antes de pasar a dos resultados, el generador debe comprobar que cada columna conserva un ancho legible.

### Daniel Carreón: simplicidad, movimiento y verificación

Carreón reduce la explicación a una sola idea visible. En teoría mantiene una columna central y no muestra más de unas pocas líneas; en resolución usa una proporción aproximada 60/40, dejando el proceso a la izquierda y la sustitución o validación a la derecha cuando ya corresponde. El término que cambia se colorea y se acompaña con un movimiento o flecha. La ecuación original permanece como ancla.

**Regla transferible:** toda operación activa debe tener un objetivo visual único. El color no debe decorar: debe responder a una semántica estable —origen, operación, resultado, alerta—. La verificación es una segunda columna opcional y solo aparece cuando el resultado ya está suficientemente estable.

### Math2me: encabezado persistente y limpieza de la zona dinámica

Math2me separa una franja superior persistente —título y forma general— de una zona inferior donde se construye el ejemplo. El encabezado permanece porque conecta teoría y práctica; la zona inferior se limpia antes de cambiar de tipo de ecuación. Cuando una operación exige más ancho, como una tabla o factorización, el diseño reconoce que no todas las tareas caben en el mismo formato.

**Regla transferible:** declarar un `persistent_header` independiente del ledger de trabajo. El cambio de método debe disparar una recalibración de layout; si una operación necesita ancho adicional, no se debe reducir toda la tipografía para mantener una plantilla fija.

### Matemáticas con Juan: error visible y corrección con cierre

El video de Matemáticas con Juan utiliza una estructura de error común frente a procedimiento correcto. El error se deja llegar a una consecuencia absurda, se marca con tachadura y después se reconstruye el procedimiento correcto. La carga simultánea es baja: una o dos líneas, con verificación desplazada hacia la derecha. El borrado frecuente sacrifica parte del historial, pero mejora la atención selectiva.

**Regla transferible:** SceneSpec debe soportar una rama `counterexample` o `wrong_path` con estilo visual de alerta, duración corta, consecuencia explícita y limpieza antes de la solución. No se debe mostrar un procedimiento incorrecto sin tachadura, etiqueta o conclusión que indique que es falso.

### 3Blue1Brown: ancla conceptual y transformación con propósito

3Blue1Brown alterna entre conexión humana, papel y animación conceptual. No es una plantilla que convenga copiar literalmente, pero aporta dos principios: mantener verdades clave visibles mientras el trabajo cambia y hacer que una transformación visual represente una relación matemática real. La densidad comienza baja, aumenta gradualmente y nunca exige interpretar simultáneamente todos los niveles de la explicación.

**Regla transferible:** la animación especial debe reservarse para el cambio conceptual que merece una transformación; no usar efectos complejos para cada paso algebraico. Toda visualización debe tener una pregunta guía y una correspondencia explícita entre objeto visual y símbolo.

## 4. Modelo de composición recomendado para Zenit

### 4.1 Zonas base del lienzo 16:9

Con la configuración estándar de Manim, el marco es aproximadamente 14.22 × 8 unidades. Con margen horizontal y vertical del 8 %, la zona segura tiene aproximadamente 11.95 × 6.72 unidades. Estos valores deben tratarse como presupuesto, no como permiso para llenar todo el marco.

| Zona | Proporción sugerida | Uso | Persistencia |
|---|---:|---|---|
| `header` | 11–14 % de la altura segura | Título breve, tipo de problema y método | Persistente durante el beat |
| `anchor` | 16–22 % | Ecuación original, forma general o regla | Persistente hasta que cambie el objetivo |
| `active` | 48–58 % | Paso actual y estado anterior inmediato | Se reorganiza por microstep |
| `support` | 20–28 % del ancho cuando se abre | Datos, verificación, alerta o resultado alternativo | Condicional |
| `footer` | 8–10 % | TTS visual breve, checkpoint o navegación | No usar como párrafo largo |

### 4.2 Modos de layout

| Modo | Cuándo usarlo | División | Restricción de legibilidad |
|---|---|---|---|
| `linear` | Cadena de transformaciones | Una columna activa | Máximo 4–5 estados visibles; no escalar el estado actual por debajo de 0.75 de su tamaño base |
| `split` | Comparación, datos/proceso, proceso/verificación | 58 % / 42 % con gap | Solo si cada columna conserva al menos 4.5 unidades de ancho útil |
| `triad` | Tres coeficientes cortos, tres casos o dos raíces más contexto | 32 % / 32 % / 32 % con gaps | Prohibido para ecuaciones largas; activar solo con prueba de ancho y altura |
| `stacked` | Explicación conceptual o narración de una regla | Encabezado + bloque central | Una idea por bloque; máximo 3 líneas de texto simultáneas |
| `reset` | Cambio de ejercicio, método o capítulo | Limpieza de zona activa | Pausa de 1.2–2.0 s antes del nuevo ancla |

La selección debe ser declarativa. SceneSpec no debe recibir únicamente posiciones; debe recibir intención de layout y límites de densidad. Aquila debe resolver la geometría y rechazar el layout si la expresión no cabe, en vez de reducirla indefinidamente.

### 4.3 Política de retiro de información

La información se retira cuando deja de participar en la inferencia activa y ya se ha cumplido una de estas condiciones: el estudiante recibió la explicación, transcurrió una pausa, existe un nuevo estado equivalente más claro o se inicia un ejercicio diferente. El retiro debe ser gradual y con motivo.

| Política | Acción visual | Cuándo aplicarla |
|---|---|---|
| `keep` | Opacidad 1.0, tamaño completo | Ancla o estado actual |
| `demote` | Opacidad 0.35–0.50, escala 0.78, desplazar a memoria | Estado anterior útil para comparar |
| `summarize` | Sustituir varios estados por etiqueta “dividimos entre a” o mini-traza | Más de dos ancestros o saturación de altura |
| `clear_active` | Retirar el bloque de trabajo, conservar ancla | Cambio de operación o método |
| `reset_exercise` | Limpiar zona completa y comenzar nueva composición | Nuevo ejercicio o nuevo caso |

**Regla práctica:** nunca reducir el estado actual para preservar ancestros que el estudiante ya no necesita. Primero se resume o se retira el ancestro; solo después se evalúa reducir el actual.

## 5. Métricas que Aquila debe auditar

La auditoría actual detecta salida del marco y colisiones, pero no sabe si una escena es pedagógicamente legible. Se necesitan métricas de espacio y ritmo.

| Métrica | Umbral inicial recomendado | Nivel si falla |
|---|---:|---|
| Margen mínimo al borde seguro | ≥ 8 % del marco | Error geométrico |
| Altura de la expresión actual | ≥ 0.42 unidades o escala base ≥ 0.75 | Error de legibilidad |
| Ancho útil de columna | ≥ 4.5 unidades en `split`; ≥ 3.4 en `triad` solo para fórmulas cortas | Error de layout |
| Filas de cálculo activas | ≤ 5 en `linear` | Advertencia; error si además hay texto largo |
| Elementos con opacidad > 0.65 en zona activa | ≤ 4 grupos | Advertencia de densidad |
| Texto narrativo simultáneo | ≤ 2 líneas o 110 caracteres | Advertencia |
| Objetivos visuales destacados a la vez | 1 principal + 1 contextual | Error de foco |
| Pausa tras transformación irreversible | ≥ 1.0 s; cierre ≥ 1.5 s | Advertencia de ritmo |
| Tiempo entre escritura y explicación | ≤ 0.8 s | Advertencia de sincronía |
| Estado actual reducido por saturación | Nunca | Error de política |

Estos umbrales son parámetros iniciales de ingeniería, no afirmaciones universales. Deben calibrarse con revisiones visuales y pruebas con estudiantes de UNI.

## 6. Qué debe cambiar en el pipeline

### Contrato SceneSpec v2

Añadir al contrato una sección `layout_plan` por beat o microstep con `mode`, `zones`, `column_policy`, `max_active_groups`, `min_readable_scale`, `retention_policy` y `reset_trigger`. Cada cue visual necesita `at` relativo al audio, `duration`, `target`, `action` y opcionalmente `focus_weight`.

### MathLedger

Separar `anchor_entries`, `active_entries` y `compressed_entries`. El ledger debe poder demover un estado a una memoria lateral o resumirlo con la operación realizada. La función de ajuste nunca debe escalar el estado actual por debajo de su escala mínima; debe retirar ancestros antes de comprimir la expresión principal.

### AquilaDirector

Incorporar un resolvedor de layouts `linear`, `split`, `triad` y `stacked`, con cálculo de ancho disponible, prueba de legibilidad, reglas de separación y detección de foco múltiple. Las colisiones deben distinguir entre una proximidad intencional dentro de un grupo y una superposición accidental entre zonas.

### TTS y sincronización

Dividir clips largos en frases o generar timestamps de palabra/frase. Un microstep de 16–25 segundos debe contener varias operaciones visuales si la narración realmente las describe. Si solo hay una transformación matemática, el audio debe acortarse o incorporar pausas explícitas; no se debe dejar una fórmula estática durante 20 segundos.

### Reproductor web

El reproductor debe visualizar el mismo layout plan que el video: mostrar cuándo una línea es ancla, cuándo pasa a memoria y cuándo se retira. El modo guiado debe revelar por eventos temporales; el modo controlado debe permitir inspeccionar cada estado; el modo práctica debe ocultar solo el estado activo, no el contexto necesario.

## 7. Prioridad de implementación

| Prioridad | Entregable | Resultado esperado |
|---:|---|---|
| P0 | `CanvasLayout` con `linear/split/triad/reset` y presupuestos de ancho | El generador deja de apilar todo en una única columna |
| P0 | Política de retiro del MathLedger | El estado actual permanece grande y los ancestros se resumen o limpian |
| P0 | Auditoría de densidad y escala | Aquila falla antes del render cuando el lienzo se vuelve ilegible |
| P1 | Cues temporales internos y TTS por frase | Cada cosa que se dice aparece, se señala o se transforma en el momento correcto |
| P1 | Plantillas de verificación y error común | Se incorporan los patrones de Carreón y Matemáticas con Juan sin improvisar |
| P1 | Capítulo piloto rediseñado en dos columnas | Normalización y fórmula general aprovechan el lienzo real |
| P2 | Revisión con estudiantes y calibración de umbrales | Las reglas dejan de ser solo heurísticas del director |

> **Conclusión:** el siguiente salto de calidad no consiste en añadir más efectos. Consiste en pasar de un “ledger que conserva todo” a una **dirección espacial por intención**, donde cada escena decide qué ocupa el centro, qué queda como memoria, cuándo se abre una segunda o tercera columna y cuándo se limpia la pizarra. Esa es la diferencia entre una animación técnicamente correcta y una clase visualmente dirigida.

## Referencias

[1]: https://www.youtube.com/watch?v=BxrJmKdPHRs "Matemáticas profe Alex — Ecuación cuadrática por fórmula general | Ejemplo 1"
[2]: https://www.youtube.com/watch?v=qeKEA066OSs "JulioProfe — Ecuaciones lineales o de primer grado | Ej. 1 → 3"
[3]: https://www.youtube.com/@danielcarreon "Daniel Carreón — canal oficial"
[4]: https://www.youtube.com/user/julioprofe "JulioProfe — canal oficial"
[5]: https://www.youtube.com/watch?v=IHblqjW8RY8 "Daniel Carreón — Ecuaciones de primer grado"
[6]: https://www.youtube.com/watch?v=hAL4hx26n60 "Math2me — Intro a las ecuaciones cuadráticas"
[7]: https://www.youtube.com/watch?v=2mS5Bi0t1K8 "Matemáticas con Juan — ¡Cuidado con esta ecuación de primer grado!"
[8]: https://www.youtube.com/watch?v=MHXO86wKeDY "3Blue1Brown — The simpler quadratic formula"

## 8. Validación del piloto rediseñado

Después de traducir los hallazgos a código, se renderizaron varias pruebas rápidas del piloto. La versión final de prueba incorpora un layout `split` real, un título y una ecuación ancla compuestos en una banda superior, un eje izquierdo estable para el historial, una columna derecha que muestra únicamente el paso actual y cues visuales programados dentro de cada clip de audio.

La auditoría visual final del render de prueba obtuvo **PASS**. Confirmó que el título del beat ya no se solapa con la ecuación ancla, que las columnas mantienen ejes estables, que la guía evita una pared de texto, que la ecuación activa conserva una escala mayor que el estado anterior y que la sincronización voz-cue es precisa. El render de prueba quedó en 480p15 y aproximadamente 129.33 segundos; la resolución baja fue deliberada para iterar composición antes de producir la versión 1080p60.

Quedan dos ajustes menores para la exportación final: suavizar la entrada del signo negativo en el último movimiento de término y revisar el perfil de color para evitar saturación del rojo de la ecuación ancla. Ninguno de los dos invalida el nuevo sistema de composición.

## 9. Artefactos de implementación generados

- `animations/layout_engine.py`: modos `linear`, `split`, `triad`, `stacked` y `reset`, con presupuestos de ancho y escala mínima.
- `animations/director_aquila.py`: resolución de layouts, alineación interna, auditoría de densidad y control de legibilidad.
- `animations/math_ledger.py`: estados recientes grandes, ancestros comprimidos y eje horizontal estable.
- `animations/scenespec_v2.py`: `LayoutPlanSpec` por beat/microstep, política de persistencia y presupuesto de densidad.
- `animations/manim/normalizacion_v2_guiada.py`: piloto con dos columnas, guía de paso actual y cues temporales.
- `public/scenespec/normalizacion_v2.json`: copia pública sincronizada para el reproductor web.
