import katex from "katex";
import { katexMacros } from "@/lib/katex-macros";

/**
 * Los props de <Quiz> (y cualquier otro texto que llegue como string JS
 * plano, no como contenido MDX) nunca pasan por el pipeline de MDX
 * (remark-math/rehype-katex) — un "$a \neq b$" ahí se quedaría como texto
 * literal. MathText hace ese mismo renderizado en tiempo de render,
 * partiendo el string en segmentos de texto y de fórmula ($...$).
 */
export function MathText({ text }: { text: string }) {
  const partes = text.split(/(\$[^$]+\$)/g);

  return (
    <>
      {partes.map((parte, i) => {
        if (parte.length > 2 && parte.startsWith("$") && parte.endsWith("$")) {
          const html = katex.renderToString(parte.slice(1, -1), {
            throwOnError: false,
            output: "html",
            macros: katexMacros,
          });
          return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
        }
        return <span key={i}>{parte}</span>;
      })}
    </>
  );
}
