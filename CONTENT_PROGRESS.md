# CONTENT_PROGRESS.md — Sistema Zenit

> Memoria persistente entre sesiones. Se actualiza al terminar cada subtema/tema.
> Estado del proyecto: **Fase 2 en curso (Aritmética)**. El patrón validado en el tema
> piloto "Triángulos" (Geometría, 7/7 subtemas) se está replicando tema por tema.
> Ver `PROJECT_BRIEF.md` §7 para el roadmap por fases.

Leyenda: ⬜ pendiente · 🟨 en progreso (algunos subtemas) · ✅ completo (todos los subtemas)

## Matemática — 51 temas

### A. Aritmética (1/12)

- ✅ 1. Razones y proporciones
  - ✅ Razones aritmética, geométrica y armónica
  - ✅ Proporciones aritmética, geométrica y armónica
  - ✅ Medias aritmética, geométrica y armónica
  - ✅ Series de razones geométricas equivalentes
- ⬜ 2. Magnitudes proporcionales
- ⬜ 3. Interés simple y compuesto
- ⬜ 4. Mezcla y aleación
- ⬜ 5. Estadística
- ⬜ 6. Probabilidad
- ⬜ 7. Numeración
- ⬜ 8. Números naturales y números enteros
- ⬜ 9. Divisibilidad
- ⬜ 10. Números primos
- ⬜ 11. Números racionales e irracionales
- ⬜ 12. Potenciación y radicación

### B. Álgebra (0/9)

- ⬜ 1. Lógica, conjuntos, números reales, ecuaciones e inecuaciones
- ⬜ 2. Ecuaciones e inecuaciones de segundo grado
- ⬜ 3. Funciones
- ⬜ 4. Funciones polinomiales (incluye números complejos)
- ⬜ 5. Función exponencial y logarítmica
- ⬜ 6. Matrices y determinantes
- ⬜ 7. Sistemas de ecuaciones e inecuaciones
- ⬜ 8. Optimización lineal
- ⬜ 9. Sucesiones y series numéricas

### C. Geometría (1/19)

- ⬜ 1. Nociones básicas
- ✅ 2. Triángulos — *tema piloto de la Fase 1*
  - ✅ Definición y clasificación de triángulos
  - ✅ Teoremas fundamentales del triángulo
  - ✅ Congruencia de triángulos
  - ✅ Teorema de la bisectriz de un ángulo
  - ✅ Teorema de la mediatriz de un segmento
  - ✅ Teorema de la base media
  - ✅ Teorema de la mediana relativa a la hipotenusa
- ⬜ 3. Polígonos
- ⬜ 4. Circunferencia
- ⬜ 5. Proporcionalidad
- ⬜ 6. Relaciones métricas en un triángulo
- ⬜ 7. Relaciones métricas en la circunferencia
- ⬜ 8. Polígonos regulares convexos
- ⬜ 9. Longitud de la circunferencia
- ⬜ 10. Áreas de regiones poligonales
- ⬜ 11. Elementos de geometría del espacio
- ⬜ 12. Ángulos diedros
- ⬜ 13. Ángulos sólidos o ángulos poliedros
- ⬜ 14. Poliedros geométricos
- ⬜ 15. Prisma
- ⬜ 16. Pirámide
- ⬜ 17. Cilindro
- ⬜ 18. Cono
- ⬜ 19. Esfera

### D. Trigonometría (0/11)

- ⬜ 1. Ángulo trigonométrico
- ⬜ 2. Longitud de un arco de circunferencia y área del sector circular
- ⬜ 3. Razones trigonométricas de ángulos agudos
- ⬜ 4. Razones trigonométricas de ángulos de cualquier magnitud (+ geometría analítica de la recta)
- ⬜ 5. Razones trigonométricas en la circunferencia trigonométrica
- ⬜ 6. Identidades trigonométricas
- ⬜ 7. Funciones trigonométricas y sus gráficas
- ⬜ 8. Funciones trigonométricas inversas y gráficas
- ⬜ 9. Ecuaciones e inecuaciones trigonométricas
- ⬜ 10. Resolución de triángulos
- ⬜ 11. Tópicos afines a la trigonometría (números complejos aplicados, secciones cónicas)

**Total Matemática: 2/51 temas completos.**

## Ciencias — fuera de alcance por ahora

Pilar futuro. Ruta `/ciencias` existe como placeholder ("Próximamente"); estructura de
datos vacía (`areas: []` en `lib/curriculum/index.ts`). No se genera temario hasta tener
el syllabus oficial.

## Aptitud Académica — fuera de alcance por ahora

Pilar futuro. Ruta `/aptitud-academica` existe como placeholder ("Próximamente");
estructura de datos vacía. No se genera temario hasta tener el syllabus oficial.

## Fase actual

- [x] Fase 0 — Cimientos del proyecto (scaffold, sistema de diseño, rutas de 4 niveles,
      MDX + KaTeX, JSXGraph, `PROJECT_BRIEF.md`, `CONTENT_PROGRESS.md`)
- [x] Fase 1 — Tema piloto: **Triángulos** (Geometría), 7 subtemas completos con el
      molde pedagógico íntegro (objetivo, marco teórico con demostraciones paso a
      paso acompañadas de diagramas JSXGraph, visualización interactiva, 4-5 ejemplos
      resueltos, 6 problemas en 3 niveles con solución desplegable, quiz de 6
      preguntas, errores frecuentes, conexiones). El subtema original "Aplicaciones de
      la congruencia" se dividió en 4 subtemas independientes (bisectriz, mediatriz,
      base media, mediana relativa a la hipotenusa) para no sobrecargar una sola
      página. Componentes reutilizables listos para el resto del temario:
      `components/pedagogy/*` (Objetivo, EjemploResuelto, Problema/Solucion, Quiz,
      ErroresFrecuentes, Conexiones) y `components/interactive/*`
      (JSXGraphBoard, FiguraInteractiva, FiguraDemostracion, jsxgraph-utils).
- [ ] Fase 2 — Aritmética completa (12 temas), en curso:
      **Razones y proporciones** completo (4 subtemas: razones, proporciones, medias —
      con demostración de AM ≥ GM ≥ HM —, y series de razones equivalentes). Widgets
      nuevos con sliders/SVG en vez de JSXGraph (`components/interactive/aritmetica/*`),
      ya que estos subtemas son numéricos, no construcciones euclidianas.
- [ ] Fase 3 — Álgebra completa (9 temas)
- [ ] Fase 4 — Geometría completa (19 temas)
- [ ] Fase 5 — Trigonometría completa (11 temas)
- [ ] Fase 6 — Funcionalidades avanzadas (simulacro cronometrado, cuentas/progreso,
      repetición espaciada, modo oscuro, PWA)
- [ ] Fase 7 — Pulido y lanzamiento
