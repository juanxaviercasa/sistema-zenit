import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { CardLink } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAreaStyle } from "@/components/ui/area-style";
import { getArea, getPrueba } from "@/lib/curriculum";

type AreaPageProps = { params: Promise<{ area: string }> };

export function generateStaticParams() {
  const prueba = getPrueba("matematica");
  return (prueba?.areas ?? []).map((area) => ({ area: area.slug }));
}

export async function generateMetadata(
  props: AreaPageProps
): Promise<Metadata> {
  const { area: areaSlug } = await props.params;
  const area = getArea("matematica", areaSlug);
  if (!area) return {};
  return {
    title: area.nombre,
    description: area.descripcion,
  };
}

export default async function AreaPage(props: AreaPageProps) {
  const { area: areaSlug } = await props.params;
  const area = getArea("matematica", areaSlug);
  if (!area) notFound();

  const { icon: Icon, color, tint } = getAreaStyle(areaSlug);

  return (
    <Container className="py-16">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-gold-600">
        Matemática
      </p>
      <div className="mt-3 flex items-center gap-4">
        <span
          className="inline-flex size-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: tint, color }}
        >
          <Icon className="size-7" strokeWidth={2} />
        </span>
        <h1 className="font-display text-4xl font-semibold">{area.nombre}</h1>
      </div>
      <p className="mt-4 max-w-2xl text-foreground/70">{area.descripcion}</p>

      <ol className="mt-12 space-y-3">
        {area.temas.map((tema) => {
          const listo = tema.subtemas.length > 0;
          return (
            <li key={tema.slug}>
              <CardLink
                href={`/matematica/${area.slug}/${tema.slug}`}
                accent={color}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold"
                    style={{ backgroundColor: tint, color }}
                  >
                    {String(tema.numero).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="font-medium">{tema.titulo}</h2>
                    {tema.nota && (
                      <p className="text-xs text-foreground/50">{tema.nota}</p>
                    )}
                  </div>
                </div>
                {listo ? (
                  <Badge
                    variant="neutral"
                    style={{ backgroundColor: tint, color, borderColor: "transparent" }}
                  >
                    Disponible
                  </Badge>
                ) : (
                  <Badge variant="neutral">Próximamente</Badge>
                )}
              </CardLink>
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
