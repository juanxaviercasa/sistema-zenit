import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getAreaStyle } from "@/components/ui/area-style";
import { getArea, getPrueba, getSubtema, getTema } from "@/lib/curriculum";

export function generateStaticParams() {
  const prueba = getPrueba("matematica");
  return (prueba?.areas ?? []).flatMap((area) =>
    area.temas.flatMap((tema) =>
      tema.subtemas.map((subtema) => ({
        area: area.slug,
        tema: tema.slug,
        subtema: subtema.slug,
      }))
    )
  );
}

export async function generateMetadata(
  props: PageProps<"/matematica/[area]/[tema]/[subtema]">
): Promise<Metadata> {
  const { area: areaSlug, tema: temaSlug, subtema: subtemaSlug } = await props.params;
  const subtema = getSubtema("matematica", areaSlug, temaSlug, subtemaSlug);
  if (!subtema) return {};
  return { title: subtema.titulo };
}

// El contenido vive en content/matematica/<area>/<tema>/<subtema>.mdx —
// ver CLAUDE.md para la convención de autoría de un subtema.
async function loadSubtemaContent(area: string, tema: string, subtema: string) {
  try {
    return (await import(`@/content/matematica/${area}/${tema}/${subtema}.mdx`)) as {
      default: React.ComponentType;
    };
  } catch {
    return null;
  }
}

export default async function SubtemaPage(
  props: PageProps<"/matematica/[area]/[tema]/[subtema]">
) {
  const { area: areaSlug, tema: temaSlug, subtema: subtemaSlug } = await props.params;

  const area = getArea("matematica", areaSlug);
  const tema = getTema("matematica", areaSlug, temaSlug);
  const subtema = getSubtema("matematica", areaSlug, temaSlug, subtemaSlug);
  if (!area || !tema || !subtema) notFound();

  const mod = await loadSubtemaContent(areaSlug, temaSlug, subtemaSlug);
  if (!mod) notFound();

  const Content = mod.default;
  const { icon: Icon, color } = getAreaStyle(areaSlug);

  const indice = tema.subtemas.findIndex((s) => s.slug === subtemaSlug);
  const anterior = indice > 0 ? tema.subtemas[indice - 1] : null;
  const siguiente = indice < tema.subtemas.length - 1 ? tema.subtemas[indice + 1] : null;
  const base = `/matematica/${area.slug}/${tema.slug}`;

  return (
    <Container className="max-w-4xl py-16">
      <div className="flex items-center justify-between">
        <p
          className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.3em]"
          style={{ color }}
        >
          <Icon className="size-4" strokeWidth={2.5} />
          {area.nombre} · {tema.titulo}
        </p>
        <span className="text-xs font-medium text-foreground/40">
          {indice + 1} / {tema.subtemas.length}
        </span>
      </div>
      <article className="mt-4">
        <Content />
      </article>

      {(anterior || siguiente) && (
        <nav className="mt-16 flex items-center justify-between gap-4 border-t border-border pt-6">
          {anterior ? (
            <Link
              href={`${base}/${anterior.slug}`}
              className="group flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-foreground/70 transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <ArrowLeft className="size-4 shrink-0 transition-transform group-hover:-translate-x-0.5" />
              <span>
                <span className="block text-xs text-foreground/40">Anterior</span>
                {anterior.titulo}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {siguiente && (
            <Link
              href={`${base}/${siguiente.slug}`}
              className="group flex items-center gap-2 rounded-xl px-4 py-3 text-right text-sm text-foreground/70 transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <span>
                <span className="block text-xs text-foreground/40">Siguiente</span>
                {siguiente.titulo}
              </span>
              <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </Link>
          )}
        </nav>
      )}
    </Container>
  );
}
