import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PuntoArrastrableDemo } from "@/components/interactive/punto-arrastrable-demo";

export const metadata: Metadata = { title: "Demo interactiva" };

export default function DemoInteractivoPage() {
  return (
    <Container className="max-w-xl py-16">
      <p className="font-serif text-sm uppercase tracking-[0.3em] text-gold-600">
        Cimientos técnicos
      </p>
      <h1 className="mt-3 font-serif text-3xl font-semibold">
        Demo de visualización interactiva
      </h1>
      <p className="mt-4 text-foreground/70">
        Arrastra el punto P. Esto valida la tubería JSXGraph que usarán las
        visualizaciones reales de Geometría y Trigonometría.
      </p>
      <div className="mt-8">
        <PuntoArrastrableDemo />
      </div>
    </Container>
  );
}
