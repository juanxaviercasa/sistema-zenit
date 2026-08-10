import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
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

  return (
    <Container className="max-w-3xl py-16">
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-gold-600">
        {area.nombre} · {tema.titulo}
      </p>
      <article className="mt-4">
        <Content />
      </article>
    </Container>
  );
}
