import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CardLink } from "@/components/ui/card";
import { getArea, getPrueba, getTema } from "@/lib/curriculum";

export function generateStaticParams() {
  const prueba = getPrueba("matematica");
  return (prueba?.areas ?? []).flatMap((area) =>
    area.temas.map((tema) => ({ area: area.slug, tema: tema.slug }))
  );
}

export async function generateMetadata(
  props: PageProps<"/matematica/[area]/[tema]">
): Promise<Metadata> {
  const { area: areaSlug, tema: temaSlug } = await props.params;
  const tema = getTema("matematica", areaSlug, temaSlug);
  if (!tema) return {};
  return { title: tema.titulo };
}

export default async function TemaPage(
  props: PageProps<"/matematica/[area]/[tema]">
) {
  const { area: areaSlug, tema: temaSlug } = await props.params;
  const area = getArea("matematica", areaSlug);
  const tema = getTema("matematica", areaSlug, temaSlug);
  if (!area || !tema) notFound();

  return (
    <Container className="py-16">
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-gold-600">
        Matemática · {area.nombre}
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold">{tema.titulo}</h1>
      {tema.nota && <p className="mt-2 text-foreground/60">{tema.nota}</p>}

      {tema.subtemas.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="font-serif text-lg font-semibold">Contenido en desarrollo</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-foreground/60">
            Este tema todavía no tiene subtemas publicados. Sigue el roadmap en{" "}
            <code className="rounded bg-surface-muted px-1.5 py-0.5 text-xs">
              CONTENT_PROGRESS.md
            </code>{" "}
            para ver el orden de desarrollo.
          </p>
        </div>
      ) : (
        <ol className="mt-12 space-y-3">
          {tema.subtemas.map((subtema) => (
            <li key={subtema.slug}>
              <CardLink
                href={`/matematica/${area.slug}/${tema.slug}/${subtema.slug}`}
              >
                <h2 className="font-medium">{subtema.titulo}</h2>
              </CardLink>
            </li>
          ))}
        </ol>
      )}
    </Container>
  );
}
