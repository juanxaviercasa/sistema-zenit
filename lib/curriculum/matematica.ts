import type { Area, Subtema, Tema } from "./types";

function tema(
  numero: number,
  slug: string,
  titulo: string,
  nota?: string,
  subtemas: Subtema[] = []
): Tema {
  return { numero, slug, titulo, nota, subtemas };
}

function subtema(slug: string, titulo: string): Subtema {
  return { slug, titulo };
}

const subtemasTriangulos: Subtema[] = [
  subtema("definicion-y-clasificacion", "Definición y clasificación de triángulos"),
  subtema("teoremas-fundamentales", "Teoremas fundamentales del triángulo"),
  subtema("congruencia-de-triangulos", "Congruencia de triángulos"),
  subtema("teorema-de-la-bisectriz", "Teorema de la bisectriz de un ángulo"),
  subtema("teorema-de-la-mediatriz", "Teorema de la mediatriz de un segmento"),
  subtema("teorema-de-la-base-media", "Teorema de la base media"),
  subtema(
    "teorema-de-la-mediana-a-la-hipotenusa",
    "Teorema de la mediana relativa a la hipotenusa"
  ),
];

const subtemasRazonesYProporciones: Subtema[] = [
  subtema(
    "razones-aritmetica-geometrica-y-armonica",
    "Razones aritmética, geométrica y armónica"
  ),
  subtema(
    "proporciones-aritmetica-geometrica-y-armonica",
    "Proporciones aritmética, geométrica y armónica"
  ),
  subtema("medias-aritmetica-geometrica-y-armonica", "Medias aritmética, geométrica y armónica"),
  subtema(
    "series-de-razones-geometricas-equivalentes",
    "Series de razones geométricas equivalentes"
  ),
];

const subtemasMagnitudesProporcionales: Subtema[] = [
  subtema(
    "magnitudes-directamente-e-inversamente-proporcionales",
    "Magnitudes directamente e inversamente proporcionales"
  ),
  subtema("regla-de-tres-simple-y-compuesta", "Regla de tres simple y compuesta"),
  subtema("tanto-por-ciento-y-tanto-por-uno", "Tanto por ciento y tanto por uno"),
  subtema("incrementos-y-descuentos-sucesivos", "Incrementos y descuentos sucesivos"),
  subtema(
    "reparto-proporcional-simple-y-compuesto",
    "Reparto proporcional simple y compuesto"
  ),
];

const subtemasInteresSimpleYCompuesto: Subtema[] = [
  subtema("interes-simple-elementos-y-monto", "Interés simple: elementos y monto"),
  subtema(
    "interes-compuesto-y-capitalizacion-continua",
    "Interés compuesto y capitalización continua"
  ),
  subtema("descuento-comercial-y-racional", "Descuento comercial y racional"),
  subtema(
    "intercambio-de-letras-y-vencimiento-comun",
    "Intercambio de letras y vencimiento común"
  ),
];

const subtemasMezclaYAleacion: Subtema[] = [
  subtema(
    "mezcla-de-sustancias-de-diferentes-precios",
    "Mezcla de sustancias de diferentes precios"
  ),
  subtema(
    "mezcla-de-sustancias-de-diferentes-concentraciones",
    "Mezcla de sustancias de diferentes concentraciones"
  ),
  subtema(
    "mezcla-de-sustancias-de-diferentes-densidades",
    "Mezcla de sustancias de diferentes densidades"
  ),
  subtema(
    "aleacion-de-metales-y-ley-de-las-aleaciones-de-oro",
    "Aleación de metales y ley de las aleaciones de oro"
  ),
];

const subtemasEstadistica: Subtema[] = [
  subtema(
    "poblacion-muestra-y-variables-estadisticas",
    "Población, muestra y variables estadísticas"
  ),
  subtema("tablas-y-graficos-estadisticos", "Tablas y gráficos estadísticos"),
  subtema("medidas-de-tendencia-central", "Medidas de tendencia central"),
  subtema(
    "medidas-de-dispersion-varianza-y-desviacion-estandar",
    "Medidas de dispersión: varianza y desviación estándar"
  ),
];

const subtemasProbabilidad: Subtema[] = [
  subtema("espacio-muestral-eventos-y-probabilidad", "Espacio muestral, eventos y probabilidad"),
  subtema(
    "principios-de-conteo-multiplicacion-adicion-y-factorial",
    "Principios de conteo: multiplicación, adición y factorial"
  ),
  subtema("permutaciones-y-combinaciones", "Permutaciones y combinaciones"),
  subtema(
    "variable-aleatoria-discreta-y-esperanza-matematica",
    "Variable aleatoria discreta y esperanza matemática"
  ),
];

const subtemasNumeracion: Subtema[] = [
  subtema(
    "sistemas-de-numeracion-y-representacion-polinomial",
    "Sistemas de numeración y representación polinomial"
  ),
  subtema("cambios-de-base", "Cambios de base"),
  subtema("propiedades-de-la-numeracion", "Propiedades de la numeración"),
  subtema("conteo-de-numeros-y-de-cifras", "Conteo de números y de cifras"),
];

const subtemasNumerosNaturalesYEnteros: Subtema[] = [
  subtema(
    "numeros-naturales-operaciones-propiedades-y-limitaciones",
    "Números naturales: operaciones, propiedades y limitaciones"
  ),
  subtema(
    "numeros-enteros-operaciones-propiedades-y-limitaciones",
    "Números enteros: operaciones, propiedades y limitaciones"
  ),
];

// Temario oficial — ver docs/temario-oficial.txt (fuente de verdad literal).
// Los subtemas se completan tema por tema, en la fase de desarrollo de contenido.

const aritmetica: Area = {
  slug: "aritmetica",
  nombre: "Aritmética",
  descripcion:
    "Razones, proporciones, magnitudes, teoría de números y las bases del razonamiento cuantitativo.",
  temas: [
    tema(
      1,
      "razones-y-proporciones",
      "Razones y proporciones",
      undefined,
      subtemasRazonesYProporciones
    ),
    tema(
      2,
      "magnitudes-proporcionales",
      "Magnitudes proporcionales",
      undefined,
      subtemasMagnitudesProporcionales
    ),
    tema(
      3,
      "interes-simple-y-compuesto",
      "Interés simple y compuesto",
      undefined,
      subtemasInteresSimpleYCompuesto
    ),
    tema(4, "mezcla-y-aleacion", "Mezcla y aleación", undefined, subtemasMezclaYAleacion),
    tema(5, "estadistica", "Estadística", undefined, subtemasEstadistica),
    tema(6, "probabilidad", "Probabilidad", undefined, subtemasProbabilidad),
    tema(7, "numeracion", "Numeración", undefined, subtemasNumeracion),
    tema(
      8,
      "numeros-naturales-y-enteros",
      "Números naturales y números enteros",
      undefined,
      subtemasNumerosNaturalesYEnteros
    ),
    tema(9, "divisibilidad", "Divisibilidad"),
    tema(10, "numeros-primos", "Números primos"),
    tema(11, "numeros-racionales-e-irracionales", "Números racionales e irracionales"),
    tema(12, "potenciacion-y-radicacion", "Potenciación y radicación"),
  ],
};

const algebra: Area = {
  slug: "algebra",
  nombre: "Álgebra",
  descripcion:
    "De la lógica y los conjuntos a funciones, matrices y sistemas — el lenguaje simbólico del examen UNI.",
  temas: [
    tema(
      1,
      "logica-conjuntos-numeros-reales-ecuaciones-e-inecuaciones",
      "Lógica, conjuntos, números reales, ecuaciones e inecuaciones"
    ),
    tema(
      2,
      "ecuaciones-e-inecuaciones-de-segundo-grado",
      "Ecuaciones e inecuaciones de segundo grado"
    ),
    tema(3, "funciones", "Funciones"),
    tema(4, "funciones-polinomiales", "Funciones polinomiales", "incluye números complejos"),
    tema(5, "funcion-exponencial-y-logaritmica", "Función exponencial y logarítmica"),
    tema(6, "matrices-y-determinantes", "Matrices y determinantes"),
    tema(7, "sistemas-de-ecuaciones-e-inecuaciones", "Sistemas de ecuaciones e inecuaciones"),
    tema(8, "optimizacion-lineal", "Optimización lineal"),
    tema(9, "sucesiones-y-series-numericas", "Sucesiones y series numéricas"),
  ],
};

const geometria: Area = {
  slug: "geometria",
  nombre: "Geometría",
  descripcion:
    "Del plano al espacio: triángulos, circunferencia, áreas y los sólidos geométricos, con demostración rigurosa.",
  temas: [
    tema(1, "nociones-basicas", "Nociones básicas"),
    tema(2, "triangulos", "Triángulos", undefined, subtemasTriangulos),
    tema(3, "poligonos", "Polígonos"),
    tema(4, "circunferencia", "Circunferencia"),
    tema(5, "proporcionalidad", "Proporcionalidad"),
    tema(6, "relaciones-metricas-en-un-triangulo", "Relaciones métricas en un triángulo"),
    tema(
      7,
      "relaciones-metricas-en-la-circunferencia",
      "Relaciones métricas en la circunferencia"
    ),
    tema(8, "poligonos-regulares-convexos", "Polígonos regulares convexos"),
    tema(9, "longitud-de-la-circunferencia", "Longitud de la circunferencia"),
    tema(10, "areas-de-regiones-poligonales", "Áreas de regiones poligonales"),
    tema(11, "elementos-de-geometria-del-espacio", "Elementos de geometría del espacio"),
    tema(12, "angulos-diedros", "Ángulos diedros"),
    tema(13, "angulos-solidos-o-poliedros", "Ángulos sólidos o ángulos poliedros"),
    tema(14, "poliedros-geometricos", "Poliedros geométricos"),
    tema(15, "prisma", "Prisma"),
    tema(16, "piramide", "Pirámide"),
    tema(17, "cilindro", "Cilindro"),
    tema(18, "cono", "Cono"),
    tema(19, "esfera", "Esfera"),
  ],
};

const trigonometria: Area = {
  slug: "trigonometria",
  nombre: "Trigonometría",
  descripcion:
    "Ángulos, identidades, funciones trigonométricas y resolución de triángulos, con sus tópicos afines.",
  temas: [
    tema(1, "angulo-trigonometrico", "Ángulo trigonométrico"),
    tema(
      2,
      "longitud-de-arco-y-area-del-sector-circular",
      "Longitud de un arco de circunferencia y área del sector circular"
    ),
    tema(
      3,
      "razones-trigonometricas-de-angulos-agudos",
      "Razones trigonométricas de ángulos agudos"
    ),
    tema(
      4,
      "razones-trigonometricas-de-angulos-de-cualquier-magnitud",
      "Razones trigonométricas de ángulos de cualquier magnitud",
      "incluye geometría analítica de la recta"
    ),
    tema(
      5,
      "razones-trigonometricas-en-la-circunferencia-trigonometrica",
      "Razones trigonométricas en la circunferencia trigonométrica"
    ),
    tema(6, "identidades-trigonometricas", "Identidades trigonométricas"),
    tema(
      7,
      "funciones-trigonometricas-y-sus-graficas",
      "Funciones trigonométricas y sus gráficas"
    ),
    tema(
      8,
      "funciones-trigonometricas-inversas-y-graficas",
      "Funciones trigonométricas inversas y gráficas"
    ),
    tema(
      9,
      "ecuaciones-e-inecuaciones-trigonometricas",
      "Ecuaciones e inecuaciones trigonométricas"
    ),
    tema(10, "resolucion-de-triangulos", "Resolución de triángulos"),
    tema(
      11,
      "topicos-afines-a-la-trigonometria",
      "Tópicos afines a la trigonometría",
      "números complejos aplicados, secciones cónicas"
    ),
  ],
};

export const areasMatematica: Area[] = [aritmetica, algebra, geometria, trigonometria];
