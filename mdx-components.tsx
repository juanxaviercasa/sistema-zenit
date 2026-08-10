import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="mt-0 mb-4 font-display text-3xl font-semibold sm:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 flex items-center gap-3 font-display text-2xl font-semibold sm:text-3xl">
      <span className="h-6 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden />
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 font-display text-xl font-semibold">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-relaxed text-foreground/85">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-6 list-disc space-y-1.5 text-foreground/85">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-6 list-decimal space-y-1.5 text-foreground/85">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-gold-500 pl-4 italic text-foreground/70">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-surface-muted px-1.5 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl bg-navy-950 p-4 text-navy-foreground">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-base">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-border px-4 py-2.5 text-left text-sm font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border px-4 py-3">{children}</td>
  ),
  hr: () => <hr className="my-10 border-border" />,
  a: ({ children, ...props }) => (
    <a
      className="text-info underline decoration-info/40 underline-offset-2 hover:decoration-info"
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
