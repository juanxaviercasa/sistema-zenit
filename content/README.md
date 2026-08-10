# content/

Contenido MDX de cada subtema, organizado como:

```
content/matematica/<area>/<tema>/<subtema>.mdx
```

`<area>`, `<tema>` y `<subtema>` son los slugs definidos en `lib/curriculum/matematica.ts`.
Un subtema solo aparece en la navegación y genera ruta (`/matematica/<area>/<tema>/<subtema>`)
cuando existe **tanto** su entrada en `lib/curriculum/matematica.ts` (array `subtemas` del tema)
**como** su archivo `.mdx` aquí. Ver `CLAUDE.md` para la estructura interna que debe seguir
cada archivo (el "molde pedagógico" de `PROJECT_BRIEF.md`, sección 5).
