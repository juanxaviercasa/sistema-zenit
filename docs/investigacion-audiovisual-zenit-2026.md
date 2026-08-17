# Investigación audiovisual de Sistema Zenit

**Fecha de corte:** 17 de agosto de 2026  
**Propósito:** detener temporalmente la expansión creativa y estudiar cómo mejorar la secuencia, el ritmo, la acumulación visual y el control de cada paso en las demostraciones matemáticas de Zenit.

## Resumen ejecutivo

El diagnóstico confirma la intuición del usuario: el sistema actual ya produce videos técnicamente limpios, pero todavía no controla con suficiente precisión la relación entre **lo que se dice**, **lo que aparece**, **lo que permanece visible** y **lo que el estudiante debe comprender en ese instante**.

El problema principal no es Manim ni la calidad del render. Es la **granularidad pedagógica**. La versión actual de la fórmula general tiene siete beats y siete clips TTS, pero la transcripción contiene aproximadamente 82 segmentos temporales de habla. Es decir, cada beat contiene en promedio 11.7 unidades verbales. La escena solo conoce cinco grandes operaciones visuales —título, narración, expresión, cálculo y explicación— y no sabe qué transformación debe aparecer cuando se pronuncia cada cláusula.

> **Conclusión central:** Zenit debe pasar de un sistema `Beat → Clip de audio → Animación` a un sistema `Capítulo → Beat → MicroStep → Cue audiovisual → Estado matemático verificable`.

La investigación también muestra que el video de cinco minutos no debe comprimirse necesariamente a la fuerza. Debe convertirse en una experiencia **segmentada, navegable y controlable**, con capítulos visibles, pausas de procesamiento y posibilidad de avanzar paso a paso. La evidencia disponible favorece la segmentación significativa y el control del ritmo, especialmente cuando la explicación es compleja [8] [9].

## Línea base de Zenit

La auditoría local de `formula-general-guiada.mp4`, `SceneSpec`, Aquila y los reportes de postflight produjo la siguiente fotografía.

| Dimensión | Estado actual | Consecuencia |
|---|---|---|
| Granularidad de contenido | 7 beats para toda la derivación | Un beat mezcla definición, operación, justificación y cierre |
| Granularidad de audio | 7 clips TTS | La sincronización no llega a cada frase ni a cada transformación |
| Segmentos reconocidos en transcripción | 82 | Existe una diferencia aproximada de 11.7 segmentos por beat |
| Persistencia matemática | El grupo del beat anterior se desvanece antes del siguiente | El estudiante pierde el historial de la derivación |
| Sincronización | Por duración total del beat | La voz puede hablar de una parte mientras aparece otra |
| Control del estudiante | No existe en el video lineal | No se puede pausar por microstep, repetir solo un paso o saltar a un capítulo |
| Corrección simbólica | Se declaran expresiones y cálculos como texto | No se verifica automáticamente que cada igualdad sea válida |
| Auditoría visual | Bounding boxes, márgenes, colisiones geométricas y frames vacíos | Puede pasar una colisión semántica dentro de la misma zona segura |
| Adaptación al conocimiento previo | No existe | El principiante y el estudiante avanzado reciben la misma densidad |
| Cierre de aprendizaje | Fórmula final y narración | Falta un checkpoint activo de sustitución, predicción o autoexplicación |

La revisión humana ya aportó una evidencia importante: el postflight geométrico llegó a marcar `PASS` mientras la barra de progreso atravesaba visualmente el texto de observación. La colisión no era un desbordamiento; era un conflicto semántico de composición [6]. Por tanto, Aquila es necesario, pero no suficiente.

## Qué hacen los referentes que funciona

### 3Blue1Brown: reencuadre y construcción conceptual

El canal declara un énfasis explícito en visualizar las ideas centrales y hacer accesibles problemas difíciles mediante animación. En la consulta realizada mostraba 8.54 millones de suscriptores, 241 videos y cursos secuenciados de álgebra lineal, cálculo, redes neuronales y ecuaciones diferenciales [1].

El video analizado sobre un problema difícil utiliza una secuencia de **reto, pared y túnel**: primero plantea una dificultad atractiva, luego muestra por qué el camino directo es pesado, después reduce el problema a un caso más simple y finalmente vuelve al caso original con una nueva perspectiva. El patrón reusable para Zenit es el siguiente:

| Patrón | Implementación recomendada |
|---|---|
| Caso simple antes del caso complejo | Crear un `pretrainingChapter` antes de la demostración principal |
| Construcción auxiliar | Declarar cada línea, plano, variable o diagrama como `construction` con propósito explícito |
| Reencuadre | Permitir cambiar de estrategia sin borrar el estado anterior |
| Pregunta socrática | Insertar un `reflectionCue` antes de revelar una transformación importante |
| Ghosting | Conservar una versión tenue del estado anterior cuando la nueva escena depende de él |

### Eddie Woo: acción física y prueba por reordenamiento

El canal mostraba 2 millones de suscriptores y cursos con decenas de lecciones, además de videos populares de demostraciones geométricas [4]. En el video analizado de Pitágoras, la prueba se construye con cuatro triángulos, una primera configuración, una segunda configuración y una síntesis de áreas. Las etiquetas y los colores permanecen estables mientras las piezas se mueven.

La lección para Zenit es que la narración debe ser **acción-led**: si la voz dice “rotamos el triángulo”, el triángulo debe rotar en ese instante; si se menciona el cuadrado azul, ese color debe identificar siempre la misma cantidad. La escena debe distinguir entre `move`, `rotate`, `label`, `compare` y `conclude`, no tratarlos como una animación genérica.

### PatrickJMT: historial vertical de transformaciones

El canal mostraba 1.4 millones de suscriptores y 2.1 mil videos, organizados en playlists de límites, derivadas e integrales [5]. El video analizado de problemas básicos de integración divide el contenido en cuatro problemas, conserva el problema original arriba y escribe cada transformación debajo de la anterior.

Este patrón coincide exactamente con la necesidad expresada para Zenit:

1. El problema inicial permanece visible.
2. Cada línea es una sola transformación.
3. La razón de la transformación se explica antes de ejecutarla.
4. La simplificación se hace inmediatamente.
5. El estado anterior sigue disponible para comparar.
6. El resultado se marca como cierre del bloque.

La mejora más importante para la modalidad guiada será sustituir el `FadeOut` del grupo anterior por un **ledger matemático acumulativo**: las ecuaciones previas permanecen en una columna o se reducen gradualmente, pero nunca desaparecen sin una instrucción explícita.

### Math Antics: andamiaje, repetición y espacio en blanco

El canal mostraba 3.83 millones de suscriptores y 106 videos organizados por numeracy, aritmética, fracciones, geometría y álgebra básica [6]. La lección analizada parte de la aritmética familiar, introduce la incógnita, aumenta la complejidad gradualmente y repite términos clave.

El patrón de diseño es menos espectacular que 3Blue1Brown, pero más importante para una plataforma curricular: una sola idea activa por pantalla, fondo consistente, señalización de la variable relevante, repetición controlada, definiciones visibles y cierre con la utilidad del concepto.

### Mathematical Visual Proofs: separación de narración y visual

El canal se define como animación y explicación de pruebas sin palabras y mostraba 257 mil suscriptores y 626 videos [3]. Sus videos cortos y sus publicaciones comparando versiones narradas y sin palabras demuestran que el mismo contenido visual puede tener más de una capa de presentación.

Zenit debe conservar esta separación: **la geometría o la escritura matemática debe ser una fuente independiente de la narración**. El mismo SceneSpec debe poder producir una versión narrada, una versión silenciosa con subtítulos y una versión interactiva por microsteps.

### Derivando: contexto y humanidad en español

El canal hispanohablante Derivando presenta videos de divulgación de aproximadamente 4 a 10 minutos; el video consultado sobre la fórmula cuadrática aparecía con 203 mil vistas [11]. El análisis identificó un gancho emocional, una pregunta histórica, una definición, la fórmula, su utilidad, un recorrido por culturas y un cierre memorable.

El patrón no debe copiarse como una clase completa de resolución, pero sí puede incorporarse como **modo contexto**:

| Momento | Función para Zenit |
|---|---|
| Gancho relatable | Reducir ansiedad y conectar con una experiencia del estudiante |
| Pregunta histórica o práctica | Responder por qué existe la herramienta |
| Receta visual | Construir la fórmula en partes, no mostrarla completa de golpe |
| Ejemplo lento | Transferir de fórmula general a números concretos |
| Cierre memorable | Resumir la idea y activar una comprobación |

El análisis del video recomienda una velocidad de habla aproximada de 150–160 palabras por minuto para instrucción en español. Esta cifra debe tratarse como parámetro configurable, no como una ley fija: las fórmulas complejas requieren pausas adicionales.

### Julioprofe y Math2Me: cobertura y granularidad curricular

Julioprofe mostraba 5.06 millones de suscriptores y 1.8 mil videos, con explicaciones detalladas de ejercicios y problemas de Matemáticas y Física [10]. Math2Me mostraba cursos que se dividen en decenas de lecciones de álgebra, cálculo, probabilidad, aritmética y geometría [11].

La lección para Zenit es organizativa: la plataforma no debe intentar meter una demostración completa, un ejemplo numérico, una aplicación y una curiosidad histórica en un único video. Debe producir una serie relacionada de segmentos con continuidad, capítulos y navegación.

## Evidencia pedagógica aplicable

Mayer resume principios de aprendizaje multimedia que encajan directamente con la arquitectura que necesitamos: coherencia, señalización, contigüidad espacial y temporal, segmentación, preentrenamiento, modalidad y actividad generativa [7]. En términos de ingeniería audiovisual, esto significa lo siguiente.

| Principio | Regla de generación |
|---|---|
| Coherencia | No añadir decoración, texto o sonido que no ayude a la operación actual |
| Señalización | El término pronunciado debe recibir color, halo, subrayado o movimiento en ese momento |
| Contigüidad temporal | La aparición visual debe alinearse con la cláusula de voz que la explica |
| Contigüidad espacial | La etiqueta debe permanecer junto al objeto matemático correspondiente |
| Segmentación | Un capítulo largo debe convertirse en microsteps navegables |
| Preentrenamiento | Definir símbolos y reglas antes de pedir una transformación compleja |
| Modalidad | Usar voz para la explicación y reservar el texto visible para fórmulas y palabras clave |
| Actividad generativa | Insertar predicciones, preguntas o espacios de completación, especialmente para estudiantes avanzados |

Seidel estudió videos educativos de YouTube y encontró que los videos segmentados se percibían mejor estructurados y producían mayores ganancias de aprendizaje que una versión no segmentada del mismo material [8]. La evidencia revisada también señala que la segmentación funciona mejor cuando los límites son significativos y el reproductor ofrece capítulos, navegación y control del estudiante.

Gupta y Zheng muestran que la forma de presentar ejemplos trabajados debe depender del conocimiento previo: quienes tienen menos experiencia se benefician más de ejemplos completamente resueltos, mientras que quienes tienen mayor experiencia pueden beneficiarse de ejemplos de completación parcial [9]. Zenit debe generar, por tanto, un **modo tutor** y un **modo práctica guiada**, no solo dos estilos visuales.

## Diagnóstico comparativo

| Área | Referentes fuertes | Zenit actual | Brecha |
|---|---|---|---|
| Construcción sobre estados anteriores | PatrickJMT, Eddie Woo, 3Blue1Brown | Los beats anteriores se desvanece | Alta |
| Sincronía frase–acción | Eddie Woo, Math Antics, Derivando | Sincronía por clip largo | Muy alta |
| Reencuadre conceptual | 3Blue1Brown, Derivando | No declarado en SceneSpec | Alta |
| Escritura de una transformación por línea | PatrickJMT, Julioprofe | Un cálculo por beat | Muy alta |
| Señalización de símbolos | Math Antics, Eddie Woo | Énfasis ocasional por mobject | Media-alta |
| Segmentación del reproductor | Khan Academy, Math2Me | Video lineal de 314 s | Muy alta |
| Adaptación por conocimiento previo | Evidencia de ejemplos trabajados | No existe | Muy alta |
| Verificación matemática intermedia | PatrickJMT y resolución docente | Se narra, pero no se valida como igualdad | Alta |
| Auditoría semántica de layout | Necesaria por la experiencia de Aquila | Aquila revisa geometría, no intención | Alta |
| Contexto y motivación | Derivando, 3Blue1Brown | Fórmula directa | Media |

## Debilidades prioritarias

### Prioridad 1: falta de microsteps semánticos

La actual escena guiada tiene siete beats y siete audios; la transcripción contiene 82 segmentos. Esto impide que la aparición de cada parte de la ecuación responda a la frase que la explica. La solución no es crear 82 animaciones necesariamente, sino agrupar las frases en **acciones atómicas**: una acción matemática, una justificación y una pausa.

### Prioridad 2: desaparición del historial

El código actual desvanece `current_beat_group` antes de iniciar el siguiente beat. Esto contradice el patrón de escritura vertical y hace que el estudiante tenga que recordar el paso anterior. Debe existir un `MathLedger` persistente con niveles de opacidad, reducción de escala y desplazamiento controlado.

### Prioridad 3: audio demasiado largo para una única unidad visual

Los clips tienen entre aproximadamente 35 y 45 segundos. El sistema espera la duración del clip, pero no conoce las marcas internas. La próxima versión debe producir una pista de audio por microstep o un archivo de alineación palabra/frase que permita activar cues en tiempo real.

### Prioridad 4: falta de control del estudiante

La duración total de 314 segundos no es el único problema; el problema es que el alumno no puede detenerse en una transformación específica, repetirla o contestar una pregunta antes de continuar. El reproductor debe ofrecer capítulos, botón “siguiente microstep”, repetir paso, mostrar estado anterior y cambiar de modo completo a completación parcial.

### Prioridad 5: auditoría visual demasiado geométrica

Aquila detecta desbordamientos y colisiones de cajas, pero no sabe que un texto de takeaway y una barra inferior se cruzan semánticamente si ambos caben en la zona segura. Se necesita una capa de restricciones con relaciones: `below`, `above`, `aligned_with`, `attached_to`, `must_not_overlap`, `persists_with` y `highlighted_when`.

### Prioridad 6: falta de validación matemática por transformación

`expression`, `calculation` y `explanation` son cadenas. El pipeline debe verificar cada igualdad o equivalencia con SymPy, registrar la ley aplicada y exigir una justificación cuando la transformación cambia de forma. Un video visualmente perfecto con una igualdad falsa es un fallo crítico.

### Prioridad 7: ausencia de adaptación

La explicación actual es completa y lineal para todos. La investigación sobre ejemplos trabajados sugiere separar un modo para principiantes —todo resuelto y justificado— de un modo para estudiantes con más experiencia —algunos pasos ocultos, predicciones y completación parcial— [9].

## Decisión recomendada

No conviene seguir puliendo el video de fórmula general beat por beat sin cambiar antes el contrato de autoría. La siguiente fase debe implementar `SceneSpec v2` con `MicroStep`, ledger acumulativo, cues de audio y verificación matemática. Después se debe regenerar únicamente un piloto de 60–90 segundos —por ejemplo, la normalización de la ecuación— antes de reconstruir los cinco minutos completos.

El piloto debe compararse en tres versiones:

1. **Tutor guiado:** todos los pasos visibles, narración lenta y pausa automática.
2. **Tutor controlado:** el video se detiene tras cada microstep y requiere “Continuar”.
3. **Práctica guiada:** se oculta el siguiente cálculo y se pide al estudiante anticiparlo.

Esta estrategia protege el trabajo actual, evita seguir acumulando complejidad sobre un contrato demasiado grueso y permite medir si la mejora realmente resuelve el problema humano señalado.

## Referencias

[1]: https://www.youtube.com/c/3blue1brown "3Blue1Brown — canal oficial"
[2]: https://www.youtube.com/c/khanacademy "Khan Academy — canal oficial"
[3]: https://www.youtube.com/@MathVisualProofs/about "Mathematical Visual Proofs — canal oficial"
[4]: https://www.youtube.com/@misterwootube "Eddie Woo — canal oficial"
[5]: https://www.youtube.com/@patrickjmt "PatrickJMT — canal oficial"
[6]: https://www.youtube.com/@mathantics "Math Antics — canal oficial"
[7]: https://psycnet.apa.org/journals/mac/10/2/229/ "Mayer (2021), Evidence-based principles for how to design effective instructional videos"
[8]: https://link.springer.com/article/10.1007/s10758-024-09745-2 "Seidel (2024), Short, Long, and Segmented Learning Videos"
[9]: https://files.eric.ed.gov/fulltext/EJ1276025.pdf "Gupta y Zheng (2020), Cognitive Load in Solving Mathematics Problems"
[10]: https://www.youtube.com/user/julioprofe "Julioprofe — canal oficial"
[11]: https://www.youtube.com/@math2me "Math2Me — canal oficial"
[12]: https://www.youtube.com/@Derivando "Derivando — canal oficial"
[13]: https://aisel.aisnet.org/cais/vol53/iss1/8/ "Shen (2023), Learner Engagement with YouTube Videos in Informal Online Learning"
