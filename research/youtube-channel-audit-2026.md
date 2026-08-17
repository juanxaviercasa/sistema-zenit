# Auditoría comparativa de canales de matemáticas — notas de investigación

## Muestra inicial

### Daniel Carreón
Fuente: https://www.youtube.com/@danielcarreon

La página del canal muestra una marca educativa explícita: aproximadamente 10.2 millones de suscriptores y 4.1 mil videos en la captura consultada. La propuesta se presenta como matemáticas fáciles para principiantes y conecta los videos con libros, página web, aplicación móvil, redes sociales y canales hermanos. El video destacado visible es una división entre decimales para principiantes, con una promesa de dificultad baja y segmentación por niveles escolares. Esto indica una estrategia de marca basada en accesibilidad, repetición de formatos y continuidad fuera de YouTube.

Para la auditoría visual interesa observar especialmente cómo el canal reduce la carga cognitiva para principiantes, cómo separa el ejemplo del discurso y cómo usa el encuadre para no presentar demasiados símbolos simultáneamente.

### JulioProfe
Fuente: https://www.youtube.com/user/julioprofe

La página consultada muestra aproximadamente 5.06 millones de suscriptores y 1.8 mil videos. El canal se organiza mediante pestañas de videos, cursos, listas y publicaciones; además enlaza una web donde los contenidos están organizados por categorías y temas y ofrece documentos asociados. La marca se apoya en una identidad docente consistente y una biblioteca curricular estructurada.

La auditoría debe revisar en sus videos de álgebra cómo el docente mantiene una secuencia lineal de escritura, cuándo deja una igualdad visible, cómo introduce el siguiente renglón y qué parte del espacio de la pizarra reserva para operaciones, explicaciones y resultado.

## Hipótesis comparativas iniciales

1. La fortaleza de los canales masivos no depende solo de explicar más despacio, sino de controlar el número de elementos simultáneos y la estabilidad del encuadre.
2. La pizarra eficaz funciona como memoria de trabajo: conserva los estados necesarios para comparar, pero elimina o desplaza lo que ya no participa en la transformación actual.
3. La marca se refuerza mediante una gramática repetible: apertura, identificación del problema, operación localizada, simplificación, verificación y cierre.
4. Para Sistema Zenit será necesario medir el uso del lienzo por zonas y no solo evitar solapamientos geométricos.

## Criterios de observación para los siguientes videos

- Tipo de composición: una columna, dos columnas, tres columnas, pizarra completa o presentación por tarjetas.
- Densidad simultánea: número de fórmulas, etiquetas y llamados visibles en cada momento.
- Escala: tamaño relativo de la expresión principal, anotaciones y texto de apoyo.
- Persistencia: qué información se conserva, cuál se atenúa y cuál se retira.
- Ritmo: tiempo entre aparición, explicación, operación, pausa y limpieza.
- Navegación visual: dirección de lectura y posición estable del resultado.
- Marca: colores, tipografía, títulos, llamadas, cierre y consistencia de plantilla.
- Aplicabilidad: regla concreta que pueda expresarse en Aquila y SceneSpec v2.

## Fuentes consultadas

- [Daniel Carreón — canal de YouTube](https://www.youtube.com/@danielcarreon)
- [JulioProfe — canal de YouTube](https://www.youtube.com/user/julioprofe)

## Verificación pública de la muestra audiovisual

### Matemáticas profe Alex — video de fórmula general
Fuente: https://www.youtube.com/watch?v=BxrJmKdPHRs

La página consultada identifica el video como “Ecuación cuadrática por fórmula general | Ejemplo 1”. En la captura, el canal aparece con aproximadamente 10.7 millones de suscriptores y el video con 9.3 millones de visualizaciones. El ejemplo forma parte de un curso completo de ecuación cuadrática/segundo grado. En la columna de videos relacionados aparecen otros ejemplos de 5:55, 9:18 y 10:35, lo que confirma una estrategia de serie modular: un método o caso por video, con títulos y miniaturas consistentes.

La página refuerza una conclusión importante: la composición de la clase no está aislada del sistema de marca. El título, la miniatura, la serie y la duración acotan la promesa pedagógica antes de que empiece la explicación. Para Zenit, cada SceneSpec debería declarar también el tipo de lección, el método y el cierre esperado, y no solo los estados algebraicos.

### JulioProfe — tres ecuaciones lineales
Fuente: https://www.youtube.com/watch?v=qeKEA066OSs

La página identifica el video como “Ecuaciones lineales o de primer grado | Ej. 1 → 3 #julioprofe”. La descripción visible declara que resuelve tres ecuaciones lineales con una incógnita y expone capítulos: introducción en 0:00, ejercicio 1 en 0:29, ejercicio 2 en 1:28 y ejercicio 3 en 3:10. Este diseño por capítulos permite agrupar varios ejercicios sin perder la segmentación; cada ejemplo tiene un comienzo y un reinicio visual reconocible.

La extracción de la vista completa posterior tuvo un timeout, por lo que no se registran aquí métricas adicionales no verificadas. El análisis visual del video se realizó por separado mediante inspección audiovisual y se conserva en `research/video-analysis-julioprofe-qeKEA066OSs.txt`.

### Math2me — introducción a ecuaciones cuadráticas
Fuente: https://www.youtube.com/watch?v=hAL4hx26n60

La página identifica el video como “Intro a las ecuaciones cuadráticas │ segundo grado” y lo asocia al canal math2me. La descripción enlaza una versión nueva, el sitio math2me y redes sociales, mostrando una estrategia de marca basada en biblioteca propia y distribución multicanal. El análisis audiovisual se conserva en `research/video-analysis-math2me-hal4hx26n60.txt`.

### Daniel Carreón — limitación de verificación de metadatos
Fuente: https://www.youtube.com/watch?v=IHblqjW8RY8

La extracción pública de la página directa devolvió una página incompleta de YouTube sin título ni métricas fiables. Por ello se mantienen solamente los datos verificados en la página del canal y el análisis audiovisual guardado en `research/video-analysis-daniel-carreon-ihblqjw8ry8.txt`.
