import type { Metadata } from "next";
import { Proximamente } from "@/components/layout/proximamente";

export const metadata: Metadata = { title: "Aptitud Académica" };

export default function AptitudAcademicaPage() {
  return (
    <Proximamente
      nombre="Aptitud Académica"
      descripcion="Razonamiento verbal y razonamiento matemático-abstracto del examen de admisión UNI."
    />
  );
}
