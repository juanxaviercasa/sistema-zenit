import Link from "next/link";

interface Conexion {
  href: string;
  label: string;
}

export function Conexiones({
  requiere,
  seUsaEn,
}: {
  requiere?: Conexion[];
  seUsaEn?: Conexion[];
}) {
  return (
    <div className="my-8 grid gap-6 rounded-xl border border-border bg-surface-muted p-5 sm:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
          Requiere
        </p>
        <ConexionLista items={requiere} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
          Se usa en
        </p>
        <ConexionLista items={seUsaEn} />
      </div>
    </div>
  );
}

function ConexionLista({ items }: { items?: Conexion[] }) {
  if (!items || items.length === 0) {
    return <p className="mt-2 text-sm text-foreground/40">—</p>;
  }
  return (
    <ul className="mt-2 space-y-1.5">
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className="text-sm text-info underline decoration-info/30 underline-offset-2 hover:decoration-info"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
