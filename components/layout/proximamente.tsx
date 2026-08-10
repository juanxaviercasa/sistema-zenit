import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Proximamente({
  nombre,
  descripcion,
}: {
  nombre: string;
  descripcion: string;
}) {
  return (
    <Container className="py-24 text-center">
      <Badge variant="neutral" className="mx-auto">
        Próximamente
      </Badge>
      <h1 className="mx-auto mt-4 max-w-xl font-serif text-4xl font-semibold">
        {nombre}
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-foreground/70">{descripcion}</p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-foreground/50">
        Estamos concentrados en completar Matemática primero. Esta prueba ya tiene
        su lugar reservado en Sistema Zenit — su temario y contenido llegan después.
      </p>
      <div className="mt-8">
        <LinkButton href="/matematica" variant="outline">
          Ir a Matemática
        </LinkButton>
      </div>
    </Container>
  );
}
