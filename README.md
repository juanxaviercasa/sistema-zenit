# Zenit — Plataforma educativa de Matemáticas

> Plataforma interactiva para aprender Matemáticas y prepararse para el ingreso universitario mediante contenido estructurado, visualizaciones y explicaciones guiadas.

## Propósito

Zenit nace de la experiencia de enseñar Matemáticas y de la necesidad de convertir conceptos abstractos en rutas de aprendizaje más claras. El proyecto organiza materiales, ejemplos y explicaciones para que el estudiante pueda avanzar desde la comprensión del concepto hasta su aplicación.

## Funciones principales

- Contenido educativo organizado por temas y progresión.
- Lecciones escritas con MDX.
- Fórmulas matemáticas renderizadas con KaTeX.
- Componentes interactivos y visualizaciones para apoyar la comprensión.
- Estructura preparada para ampliar temarios, ejercicios y materiales multimedia.

## Stack

Next.js, React, TypeScript, MDX, Tailwind CSS, KaTeX, `remark-math`, `rehype-katex`, `lucide-react` y utilidades de contenido propias.

## Arquitectura de contenido

La interfaz se construye con Next.js. El contenido educativo se mantiene separado de los componentes visuales para facilitar la edición de lecciones y la incorporación de nuevos temas. MDX permite combinar texto, fórmulas y componentes interactivos en una misma experiencia.

## Inicio local

```bash
git clone https://github.com/juanxaviercasa/zenit-plataforma-educativa.git
cd zenit-plataforma-educativa
npm install
npm run dev
```

Abre `http://localhost:3000` en el navegador.

## Calidad

```bash
npm run lint
npm run build
```

## Estado

Proyecto educativo en evolución. Algunas áreas representan material de aprendizaje y prototipos interactivos que se ampliarán con nuevas lecciones, ejercicios y validaciones pedagógicas.

## Autor

**Juan Xavier Cabello** — Bachiller en Matemáticas y desarrollador web full-stack.


## Presentación profesional

Zenit demuestra cómo una experiencia docente puede convertirse en una plataforma web estructurada. El contenido se mantiene separado de la interfaz, las fórmulas se renderizan con KaTeX y los componentes interactivos permiten explicar conceptos abstractos sin depender únicamente de texto.

## Calidad y accesibilidad

La evolución recomendada es añadir pruebas de navegación por teclado, contraste, lectores de pantalla, ejercicios con estados verificables y métricas de rendimiento. Cada lección debe tener objetivo, prerrequisitos, ejemplo, práctica y criterio de avance. Esto hará visible la conexión entre ingeniería y diseño pedagógico.

## Relación con Scenic AI Tutor

Zenit será el corpus editorial autorizado para Scenic AI Tutor. La integración futura debe recuperar fragmentos con identificadores de fuente, respetar el estado de publicación y evitar que el tutor responda con material que no esté documentado o aprobado.

## Caso para reclutadores

Zenit complementa tus proyectos de herramientas para Pymes y backend: demuestra contenido técnico, accesibilidad, Matemáticas, diseño de información y capacidad para transformar conocimiento especializado en una experiencia usable.
