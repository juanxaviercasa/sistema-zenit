import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CardLink } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getArea, getPrueba } from "@/lib/curriculum";

export function generateStaticParams() {
  const prueba = getPrueba("matematica");
  return (prueba?.areas ?? []).map((area) => ({ area: area.slug }));
}

export async function generateMetadata(
  props: PageProps<"/matematica/[area]">
): Promise<Metadata> {
  const { area: areaSlug } = await props.params;
  const area = getArea("matematica", areaSlug);
  if (!area) return {};
  return {
    title: area.nombre,
    description: area.descripcion,
  };
}

export default async function AreaPage(props: PageProps<"/matematica/[area]">) {
  const { area: areaSlug } = await props.params;
  const area = getArea("matematica", areaSlug);
  if (!area) notFound();

  return (
    <Container className="py-16">
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-gold-600">
        Matemática
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold">{area.nombre}</h1>
      <p className="mt-4 max-w-2xl text-foreground/70">{area.descripcion}</p>

      <ol className="mt-12 space-y-3">
        {area.temas.map((tema) => {
          const listo = tema.subtemas.length > 0;
          return (
            <li key={tema.slug}>
              <CardLink
                href={`/matematica/${area.slug}/${tema.slug}`}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-lg text-foreground/40">
                    {String(tema.numero).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-medium">{tema.titulo}</h2>
                    {tema.nota && (
                      <p className="text-xs text-foreground/50">{tema.nota}</p>
                    )}
                  </div>
                </div>
                <Badge variant={listo ? "gold" : "neutral"}>
                  {listo ? "Disponible" : "Próximamente"}
                </Badge>
              </CardLink>
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
