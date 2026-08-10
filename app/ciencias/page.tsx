import type { Metadata } from "next";
import { Proximamente } from "@/components/layout/proximamente";

export const metadata: Metadata = { title: "Ciencias" };

export default function CienciasPage() {
  return (
    <Proximamente
      nombre="Ciencias"
      descripcion="Física, Química y Biología del examen de admisión UNI."
    />
  );
}
