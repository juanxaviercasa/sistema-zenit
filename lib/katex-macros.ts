/**
 * \neq/\ne construyen el signo "no igual" superponiendo un glifo de área de
 * uso privado (U+E020, propio de la fuente KaTeX_Main) sobre "=" — si esa
 * fuente no aplica exactamente a ese span anidado, el navegador no tiene
 * ningún glifo de reserva razonable para U+E020 y el símbolo sale
 * roto/invisible. Redefinimos ambos para usar el carácter Unicode real "≠"
 * (U+2260), que cualquier fuente sabe dibujar.
 *
 * Compartido entre next.config.ts (MDX, vía rehype-katex) y
 * components/pedagogy/math-text.tsx (Quiz, vía katex.renderToString directo)
 * para que ambos caminos de renderizado se comporten igual.
 */
export const katexMacros: Record<string, string> = {
  "\\neq": '\\mathrel{\\char"2260}',
  "\\ne": '\\mathrel{\\char"2260}',
  // Red de seguridad: si algún contenido (presente o futuro) escribe el
  // signo de grados literal "°" en vez de "^\circ", que igual se vea bien
  // en vez de salir con una fuente de reserva inconsistente.
  "°": "^\\circ",
};
