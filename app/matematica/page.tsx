import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CardLink } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPrueba } from "@/lib/curriculum";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Matemática",
  description:
    "Aritmética, Álgebra, Geometría y Trigonometría — el temario oficial de Matemática del examen de admisión UNI.",
};

export default function MatematicaPage() {
  const prueba = getPrueba("matematica");
  if (!prueba) notFound();

  const totalTemas = prueba.areas.reduce((n, a) => n + a.temas.length, 0);

  return (
    <Container className="py-16">
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-gold-600">
        Matemática
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold">
        Las 4 áreas del temario UNI
      </h1>
      <p className="mt-4 max-w-2xl text-foreground/70">
        {totalTemas} temas repartidos en Aritmética, Álgebra, Geometría y Trigonometría,
        cubiertos con teoría rigurosa, visualización interactiva y práctica de nivel de
        examen.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {prueba.areas.map((area) => (
          <CardLink key={area.slug} href={`/matematica/${area.slug}`}>
            <div className="flex items-start justify-between">
              <h2 className="font-serif text-2xl font-semibold">{area.nombre}</h2>
              <Badge variant="navy">{area.temas.length} temas</Badge>
            </div>
            <p className="mt-2 text-sm text-foreground/70">{area.descripcion}</p>
          </CardLink>
        ))}
      </div>
    </Container>
  );
}
