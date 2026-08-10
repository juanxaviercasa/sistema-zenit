# 🏔️ Sistema Zenit — Guía Maestra para construir la plataforma con Claude Code

> Documento vivo. Guárdalo en la raíz del repositorio como `PROJECT_BRIEF.md` y referéncialo al inicio de cada sesión de Claude Code con: *"Lee PROJECT_BRIEF.md antes de continuar."*

---

## 0. Cómo usar este documento

1. Crea el repositorio del proyecto y pega este archivo como `PROJECT_BRIEF.md`.
2. Empieza con el **Mega-Prompt Inicial** (sección 8) en una sesión nueva de Claude Code.
3. Avanza **por fases** (sección 7), no de una sola vez. Cada fase es una o varias sesiones.
4. Usa la sección 5 (modelo pedagógico) como el "molde" que se repite en los 51 temas — esto es lo que le da consistencia y calidad de nivel UNI a toda la plataforma.
5. Mantén un archivo `CONTENT_PROGRESS.md` que Claude Code actualiza después de cada tema completado (ver sección 9).

---

## 1. Visión del proyecto

**Sistema Zenit** es una plataforma web de matemática de nivel de admisión a la UNI (Universidad Nacional de Ingeniería, Lima), dirigida a postulantes, profesores y cualquier persona que quiera dominar matemática a ese nivel de exigencia.

Lo que la diferencia de "un PDF con teoría":

- **Rigor teórico completo** — no resúmenes superficiales; definiciones, teoremas y demostraciones cuando aportan comprensión, al nivel que exige el examen UNI.
- **Interactividad real** — el estudiante manipula, arrastra, ajusta parámetros y *ve* cómo cambia el objeto matemático (un triángulo, una función, un lugar geométrico), no solo lee sobre él.
- **Progresión pedagógica** — de la base teórica al ejemplo resuelto paso a paso, al problema propuesto con niveles de dificultad, hasta el ítem estilo examen UNI.
- **Cobertura íntegra del temario oficial** — las 4 áreas, sin recortes.

**Audiencia:** postulantes UNI, profesores que quieran usarlo como material de clase, profesionales aficionados a la matemática.

### 1.1 Alcance real: Sistema Zenit es más que Matemática

El examen de admisión a la UNI consta de **3 pruebas**: **Aptitud Académica**, **Matemática** y **Ciencias**. Sistema Zenit está concebido desde el inicio como la plataforma que cubre las 3 — pero el desarrollo **empieza y se concentra por completo en Matemática**. Aptitud Académica y Ciencias son pilares futuros: existen en la visión y en la arquitectura del sitio desde el día uno, pero no se genera contenido para ellos hasta que Matemática esté consolidada.

Esto tiene una consecuencia directa sobre cómo se modela el sitio (ver 3.1): la jerarquía de datos y rutas no es *área > tema > subtema*, sino **prueba > área > tema > subtema**, con "Matemática" como la primera prueba desarrollada y "Aptitud Académica" / "Ciencias" como estructuras placeholder.

---

## 2. Advertencia sobre el alcance (léela antes de empezar)

Tu temario oficial tiene **51 temas** repartidos así:

| Área | N° de temas del temario oficial |
|---|---|
| Aritmética | 12 |
| Álgebra | 9 |
| Geometría | 19 |
| Trigonometría | 11 |

Cada tema tiene en promedio 3–8 subtemas, y cada subtema en el modelo pedagógico completo (sección 5) implica teoría + visualización interactiva + ejemplos + problemas + quiz. Eso es del orden de **200–300 unidades de contenido interactivo**. Ninguna IA construye eso de calidad en una sola conversación.

**La estrategia correcta es:**
1. Construir primero la **plantilla/patrón** (un tema piloto, completo y pulido).
2. Validarla contigo (¿se ve bien? ¿es lo suficientemente riguroso? ¿la interactividad realmente ayuda?).
3. Replicar el patrón tema por tema, área por área, en sesiones sucesivas de Claude Code — usando este documento y el progreso guardado como memoria persistente entre sesiones.

Esto no es una limitación de Claude Code — es cómo se construye cualquier plataforma de contenido de esta escala, con o sin IA. Ir por fases también te permite lanzar un área completa (por ejemplo Aritmética) mientras las otras siguen en construcción.

---

## 3. Mapa de contenido — el temario estructurado

Esta es la estructura canónica de datos del sitio, derivada directamente de tu temario oficial. Cada tema numerado debe convertirse en una entrada de contenido con sus subtemas como secciones.

### A. Aritmética (12 temas)
1. Razones y proporciones
2. Magnitudes proporcionales
3. Interés simple y compuesto
4. Mezcla y aleación
5. Estadística
6. Probabilidad
7. Numeración
8. Números naturales y números enteros
9. Divisibilidad
10. Números primos
11. Números racionales e irracionales
12. Potenciación y radicación

### B. Álgebra (9 temas)
1. Lógica, conjuntos, números reales, ecuaciones e inecuaciones
2. Ecuaciones e inecuaciones de segundo grado
3. Funciones
4. Funciones polinomiales (incluye números complejos)
5. Función exponencial y logarítmica
6. Matrices y determinantes
7. Sistemas de ecuaciones e inecuaciones
8. Optimización lineal
9. Sucesiones y series numéricas

### C. Geometría (19 temas)
1. Nociones básicas
2. Triángulos
3. Polígonos
4. Circunferencia
5. Proporcionalidad
6. Relaciones métricas en un triángulo
7. Relaciones métricas en la circunferencia
8. Polígonos regulares convexos
9. Longitud de la circunferencia
10. Áreas de regiones poligonales
11. Elementos de geometría del espacio
12. Ángulos diedros
13. Ángulos sólidos o poliedros
14. Poliedros geométricos
15. Prisma
16. Pirámide
17. Cilindro
18. Cono
19. Esfera

### D. Trigonometría (11 temas)
1. Ángulo trigonométrico
2. Longitud de arco y área del sector circular
3. Razones trigonométricas de ángulos agudos
4. Razones trigonométricas de ángulos de cualquier magnitud (+ geometría analítica de la recta)
5. Razones trigonométricas en la circunferencia trigonométrica
6. Identidades trigonométricas
7. Funciones trigonométricas y sus gráficas
8. Funciones trigonométricas inversas y gráficas
9. Ecuaciones e inecuaciones trigonométricas
10. Resolución de triángulos
11. Tópicos afines (números complejos aplicados, secciones cónicas)

> **Nota:** el texto detallado de cada subtema (definiciones, teoremas específicos, propiedades) ya está en tu archivo `Temario_Examen_UNI_Matemática.txt`. Súbelo al repo como `docs/temario-oficial.txt` — Claude Code debe leerlo *tema por tema* al desarrollar cada sección, nunca de un tirón, para no diluir el detalle.

### 3.1 Arquitectura de navegación: Home y las 3 pruebas

El mapa de arriba (A–D) describe el contenido de **una sola prueba: Matemática**. La jerarquía real del sitio tiene un nivel superior:

```
Prueba (aptitud-academica | matematica | ciencias)
 └── Área (solo definidas para Matemática por ahora: aritmética, álgebra, geometría, trigonometría)
      └── Tema (los 51 de la sección 3)
           └── Subtema (el molde de la sección 5)
```

**Rutas:** `/matematica/...`, `/ciencias/...`, `/aptitud-academica/...` desde el inicio, aunque las dos últimas no tengan contenido todavía.

**Home (`sistemazenit.com`):** presenta las 3 pruebas como opciones igualmente visibles — el visitante elige para cuál está estudiando. Matemática lleva a contenido real; Aptitud Académica y Ciencias se muestran con un estado tipo "Próximamente" (nunca como enlace roto o página vacía sin explicación).

Ciencias y Aptitud Académica quedan como **estructura de datos vacía/placeholder**: no se les inventa temario ni contenido hasta que tengamos su syllabus oficial, igual que se hizo aquí con el de Matemática.

---

## 4. Arquitectura técnica recomendada

| Capa | Recomendación | Por qué |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | SSG para contenido teórico (rápido, buen SEO para que te encuentren postulantes buscando "razones trigonométricas UNI"), rutas dinámicas por tema/subtema |
| Contenido | **MDX** (Markdown + componentes React embebidos) | Permite escribir teoría en Markdown normal y meter un componente interactivo (`<TrianguloInteractivo />`) en medio del texto, tema por tema, sin tocar código base |
| Renderizado matemático | **KaTeX** (vía `remark-math` + `rehype-katex`) | El más rápido para LaTeX en web; esencial para notación matemática rigurosa |
| Visualización interactiva 2D | **JSXGraph** | Librería libre pensada exactamente para esto: puntos arrastrables, construcciones geométricas dinámicas, gráficos de funciones con parámetros — ideal para Geometría y Trigonometría |
| Visualización 3D | **three.js / react-three-fiber** | Poliedros, prisma, pirámide, cono, cilindro, esfera en 3D rotable |
| Gráficos estadísticos | **D3.js** o **Recharts** | Histogramas, ojivas, diagramas circulares del tema de Estadística |
| Backend / progreso de usuario | **Supabase** (Postgres + Auth) | Login de estudiantes, guardar progreso, resultados de quizzes, sin mantener servidor propio |
| Estilos | **Tailwind CSS** | Velocidad de desarrollo consistente con Claude Code |
| Despliegue | **Vercel** | Integración nativa con Next.js, dominio propio fácil de conectar |
| Testing | **Vitest** (unidad) + revisión visual manual | Los componentes interactivos matemáticos hay que verlos, no solo testear lógica |

Esto es una recomendación, no dogma — coméntaselo a Claude Code en la Fase 0 y que confirme versiones actuales antes de instalar nada.

---

## 5. El molde pedagógico (se repite en los 51 temas)

Cada **subtema** dentro de cada tema debe tener esta estructura fija — esto es lo que le da identidad y calidad consistente a Sistema Zenit:

1. **Objetivo de aprendizaje** — una frase: qué va a poder resolver el estudiante al terminar.
2. **Marco teórico** — definiciones formales, teoremas (con demostración cuando aporte comprensión real, no por relleno), propiedades, notación estándar UNI.
3. **Visualización interactiva** — el objeto matemático del subtema, manipulable (ver sección 6 para ideas concretas por área).
4. **Ejemplos resueltos** — 3 a 5, en dificultad creciente, con el razonamiento paso a paso visible (no solo el resultado).
5. **Problemas propuestos** — organizados en niveles: básico, intermedio, nivel UNI (estilo examen real), con solución oculta/desplegable.
6. **Autoevaluación** — quiz corto de 5–8 preguntas con retroalimentación inmediata.
7. **Errores frecuentes** — trampas típicas que el examen UNI suele explotar en ese tema.
8. **Conexiones** — qué temas previos se necesitan y qué temas posteriores usan esto.

---

## 6. Ideas de interactividad concretas por área

- **Aritmética:** simulador de interés compuesto con sliders (capital, tasa, tiempo); mezclador visual de aleaciones; generador de experimentos aleatorios para probabilidad (tirar dados/monedas y ver frecuencia vs. probabilidad teórica); criba de Eratóstenes animada.
- **Álgebra:** graficador de funciones con parámetros ajustables en vivo (ver cómo cambia `y = a(x-h)² + k` al mover sliders); calculadora de matrices paso a paso; plano de Argand interactivo para raíces complejas; solver visual de sistemas de inecuaciones (región factible sombreada).
- **Geometría:** construcciones tipo GeoGebra donde el estudiante arrastra vértices de un triángulo y observa en tiempo real cómo se cumplen los teoremas (ej. suma de ángulos siempre 180°); modelos 3D rotables de poliedros, prisma, pirámide, cono, cilindro y esfera con desarrollo de superficie animado.
- **Trigonometría:** círculo trigonométrico interactivo (arrastrar el ángulo y ver seno/coseno/tangente actualizarse); graficador de funciones trigonométricas con amplitud/periodo/desfase ajustables; resolutor visual de triángulos (ley de senos/cosenos); cónicas interactivas con foco/directriz manipulables.

---

## 7. Roadmap por fases

**Fase 0 — Cimientos (1 sesión larga)**
Scaffold del proyecto, stack técnico instalado, sistema de diseño de Sistema Zenit, estructura de carpetas, `CLAUDE.md` con convenciones del proyecto.

**Fase 1 — Tema piloto (1–2 sesiones)**
Un solo tema completo, con todos sus subtemas, siguiendo el molde de la sección 5. Recomendación: empezar por **"Razones trigonométricas de ángulos agudos"** o **"Triángulos"** — son visualmente ricos y sirven de vitrina para validar el patrón antes de escalar.
👉 Revisa esto con calma antes de seguir. Es la decisión más importante del proyecto: si el patrón está bien, todo lo demás es repetición disciplinada.

**Fase 2 — Aritmética completa (12 temas, varias sesiones)**

**Fase 3 — Álgebra completa (9 temas)**

**Fase 4 — Geometría completa (19 temas, la más grande — probablemente 2–3 temas por sesión)**

**Fase 5 — Trigonometría completa (11 temas)**

**Fase 6 — Funcionalidades avanzadas**
Simulacro de examen UNI cronometrado con banco de preguntas mixto; sistema de cuentas y progreso persistente (Supabase); repetición espaciada para reforzar temas débiles; modo oscuro; PWA para estudiar sin conexión.

**Fase 7 — Pulido y lanzamiento**
Revisión de accesibilidad, rendimiento (Lighthouse), corrección de contenido matemático (idealmente que alguien revise las demostraciones), conexión del dominio propio, analítica.

---

## 8. Mega-Prompt inicial — listo para copiar en Claude Code

> Este es el único prompt que necesitas para arrancar. Ya incorpora la
> arquitectura de 3 pruebas desde el inicio — no hace falta "actualizar"
> nada después, porque el proyecto todavía no existe.

```
Vamos a construir "Sistema Zenit", la plataforma web de preparación para el
examen de admisión a la UNI (Universidad Nacional de Ingeniería, Lima, Perú).

El examen de admisión UNI consta de 3 pruebas: Aptitud Académica, Matemática
y Ciencias. Sistema Zenit está concebido para cubrir las 3, pero el
desarrollo empieza y se concentra por completo en Matemática. Aptitud
Académica y Ciencias existen en la arquitectura del sitio desde el día uno
(rutas, modelo de datos, Home), pero SIN contenido todavía — son pilares
futuros, no inventes su temario.

Antes de escribir código, lee completo el archivo PROJECT_BRIEF.md que está
en la raíz del repo — contiene la visión del proyecto, el mapa de contenido
de Matemática (temario oficial de 51 temas en 4 áreas), el modelo pedagógico
que debe repetirse en cada subtema, la arquitectura técnica recomendada y el
roadmap por fases. Trátalo como la fuente de verdad del proyecto.

Tu tarea AHORA es solo la FASE 0: cimientos del proyecto. No generes
contenido matemático todavía.

1. Inicializa un proyecto Next.js (App Router) con TypeScript y Tailwind CSS.
2. Configura soporte MDX con KaTeX para renderizar notación matemática en LaTeX.
3. Instala JSXGraph para visualizaciones 2D interactivas y déjalo listo con un
   componente de ejemplo funcionando (un punto arrastrable en un plano).
4. Define un sistema de diseño coherente con el nombre "Sistema Zenit": paleta
   de colores, tipografía, componentes base (Card, Button, Badge de dificultad,
   etc.). Propón tú la dirección visual — algo serio pero no aburrido, que
   transmita rigor matemático y logro académico (zenit = punto más alto).
5. Modela la jerarquía de datos y rutas con 4 niveles: prueba > área > tema >
   subtema.
   - Rutas de nivel superior: /matematica, /ciencias, /aptitud-academica.
   - Dentro de /matematica: las 4 áreas (aritmética, álgebra, geometría,
     trigonometría) y sus temas, según el mapa de contenido de
     PROJECT_BRIEF.md. Por ahora solo estructura y una página de índice por
     área, sin contenido matemático real todavía.
   - /ciencias y /aptitud-academica: solo la estructura de datos vacía y una
     página placeholder — no generes temario para ellas.
6. Construye la página de inicio (Home, sistemazenit.com): presenta las 3
   pruebas como opciones igualmente visibles para que el usuario elija para
   cuál está estudiando. Matemática lleva a contenido real; Ciencias y
   Aptitud Académica se muestran con un estado tipo "Próximamente" (nunca
   como enlace roto o página vacía sin explicación).
7. Crea un archivo CLAUDE.md con las convenciones del proyecto: la jerarquía
   de 4 niveles, cómo se estructura un archivo MDX de subtema, cómo se
   nombran los componentes interactivos, convenciones de commits.
8. Crea un archivo CONTENT_PROGRESS.md con una checklist de los 51 temas de
   Matemática (copiada del mapa de contenido de PROJECT_BRIEF.md), todos
   marcados como pendientes, y una nota explícita de que Ciencias y Aptitud
   Académica son pilares futuros fuera de alcance por ahora.
9. Verifica que el proyecto compile y corra localmente sin errores.

Al terminar, dame un resumen de las decisiones de diseño y de arquitectura
que tomaste, y espera mi confirmación antes de seguir a la Fase 1.
```

---

## 9. Prompts de seguimiento (usar en sesiones posteriores)

**Para la Fase 1 (tema piloto):**
```
Ahora vamos con la Fase 1: el tema piloto.

Lee en docs/temario-oficial.txt el tema "[NOMBRE DEL TEMA]" completo (busca
el texto exacto de ese tema en el archivo — no lo resumas de memoria).

Desarrolla este tema completo siguiendo AL PIE DE LA LETRA el molde pedagógico
de la sección 5 de PROJECT_BRIEF.md: objetivo de aprendizaje, marco teórico
riguroso, al menos una visualización interactiva real (no un placeholder),
3-5 ejemplos resueltos paso a paso, problemas propuestos en 3 niveles de
dificultad con solución desplegable, un quiz de autoevaluación, errores
frecuentes, y conexiones con otros temas.

Al terminar, actualiza CONTENT_PROGRESS.md marcando este tema como completo.
```

**Para cada tema posterior (repetir el patrón):**
```
Siguiente tema del roadmap: "[NOMBRE DEL TEMA]" del área de [ÁREA].

Sigue exactamente el mismo patrón usado en el tema piloto "[TEMA PILOTO]"
(revisa esos archivos como referencia de estructura y calidad). Lee el
contenido oficial de este tema en docs/temario-oficial.txt antes de escribir
nada. Actualiza CONTENT_PROGRESS.md al terminar.
```

**Para retomar una sesión nueva (contexto perdido):**
```
Lee PROJECT_BRIEF.md y CONTENT_PROGRESS.md para retomar el estado actual del
proyecto Sistema Zenit. Dime qué temas están completos y cuál es el siguiente
según el roadmap antes de continuar.
```

---

## 10. Buenas prácticas trabajando con Claude Code a esta escala

- **Una fase o un tema por sesión.** No pidas "hazlo todo" — el resultado será superficial. Cerrar bien un tema y confirmar calidad antes de seguir con el próximo es más rápido a la larga.
- **`CONTENT_PROGRESS.md` es tu memoria entre sesiones.** Claude Code no recuerda conversaciones anteriores; este archivo (más PROJECT_BRIEF.md) reemplaza esa memoria.
- **Revisa el tema piloto con lupa.** Es el molde que se va a copiar 50 veces — cualquier defecto ahí se multiplica.
- **Commits frecuentes**, uno por subtema o tema, con mensajes descriptivos — te permite revertir si un tema sale mal sin perder los demás.
- **Pide explícitamente que lea el temario oficial** en cada tema nuevo, en vez de confiar en que "ya lo sabe" — así el contenido refleja exactamente lo que pide la UNI, no una versión genérica del tema.
- Si notas que Claude Code empieza a repetirse mecánicamente entre subtemas, pídele explícitamente variar los ejemplos y el enfoque de las visualizaciones — la plantilla es de estructura, no de contenido literal.

---

## 11. Branding — "Sistema Zenit"

- **Concepto:** el zenit es el punto más alto que alcanza un astro — encaja con el objetivo de tus estudiantes: llegar al puntaje más alto posible.
- **Paleta sugerida:** azul noche profundo como base (evoca el cielo en el momento del zenit), un dorado/ámbar como acento para logros y elementos destacados, blanco/gris claro para el contenido teórico (máxima legibilidad en textos largos con fórmulas).
- **Tipografía:** una serif con carácter para títulos (transmite seriedad académica) combinada con una sans-serif limpia para el cuerpo de texto; las fórmulas las maneja KaTeX automáticamente con su propia tipografía matemática.

Pide a Claude Code que proponga 2–3 direcciones visuales concretas en la Fase 0 y elige la que más te convenza — no hace falta que la decidas tú de antemano.

---

## 12. Despliegue

1. Repositorio en GitHub.
2. Conectar el repo a **Vercel** (deploy automático en cada push).
3. Conectar tu dominio propio de "Sistema Zenit" desde el panel de Vercel (registros DNS que te indique).
4. Variables de entorno (claves de Supabase, etc.) configuradas en Vercel, nunca en el código.

---

## Cierre

Este documento es tu control de mando. El proyecto es ambicioso pero completamente alcanzable si se respeta el orden: cimientos → patrón validado → repetición disciplinada por tema → funcionalidades avanzadas → pulido. Empieza con el Mega-Prompt de la sección 8 y avanza fase por fase.
