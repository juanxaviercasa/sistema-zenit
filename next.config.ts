import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

const withMDX = createMDX({
  options: {
    // Turbopack no puede recibir funciones de plugin directamente — deben ir
    // como nombre de paquete (string) para que las resuelva del lado de Rust.
    // remark-gfm habilita tablas con sintaxis de pipes (|---|---|); sin él,
    // el markdown de tabla se renderiza como texto plano con los pipes literales.
    remarkPlugins: ["remark-gfm", "remark-math"],
    rehypePlugins: ["rehype-katex"],
  },
});

export default withMDX(nextConfig);
