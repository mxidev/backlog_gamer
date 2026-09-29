# Guía del repositorio

## Aplicaciones y comandos

- `apps/web` y `apps/api` son proyectos npm independientes, cada uno con su propio `package-lock.json`. Ejecuta instalaciones y scripts desde la carpeta de la aplicación; no hay scripts en la raíz.
- Web: `npm start` inicia Angular en el puerto 4200; `npm run build` compila para producción; `npm test` ejecuta las pruebas mediante Angular CLI con Vitest. No asumas que opciones de Vitest como `--run` se aceptan a través de `ng test`.
- API: `npm run start:dev` inicia NestJS en modo watch; `npm run build` compila a `dist`; `npm test` ejecuta specs bajo `src` (Jest `rootDir` es `src`); `npm run test:e2e` utiliza `test/jest-e2e.json` para las pruebas `test/**/*.e2e-spec.ts`.
- La API exige `PORT` en `process.env`; `src/config.ts` lo valida, pero actualmente no carga `.env` automáticamente. `npm run lint` de la API incluye ESLint `--fix` y modifica archivos; no es una comprobación de solo lectura.

## Estructura y convenciones

- Web: `src/main.ts` inicia la aplicación standalone definida en `src/app/app.ts`; rutas en `app.routes.ts`, providers globales en `app.config.ts`. Angular genera componentes con SCSS y prefijo `app`; los estilos globales están en `src/styles.scss`.
- API: `src/main.ts` inicia `AppModule`; registra nuevas funcionalidades desde el módulo correspondiente.
- Prettier web: comillas simples, ancho 100 y parser Angular para HTML. API: comillas simples y comas finales.

## Contexto del producto

- `BACKLOG_GAMER.md` contiene las HUs, criterios de aceptación y estados; `PROJECT_STATE.md` resume el estado y las decisiones del proyecto. Verifica ambos contra código y Git antes de asumir que una funcionalidad o decisión ya existe.
- Consulta `docs/daily/` o `docs/snapshots/` solo si el contexto actual no basta; evita cargar el historial completo sin necesidad.
- Mantén la frontera backend para secretos, autorización y APIs externas. No des por decididas persistencia/ORM, Supabase, autenticación, proveedor de catálogo, librería UI o despliegue sin evidencia actual.

## Definition of Done para HUs

- Flujo Git: `develop` es la base del MVP; crear ramas por HU antes de implementar y dirigir PRs a `develop`. Seguir `docs/GIT_WORKFLOW.md` y consultar el estado de homologación/publicación en `PROJECT_STATE.md`. Commits y publicación requieren petición explícita.

- Criterios de aceptación cumplidos; build y verificaciones relevantes pasan; errores importantes y autorización considerados cuando aplique; sin secretos expuestos y con documentación afectada actualizada.
- Usa las skills del proyecto en `.agents/skills/` para workflows específicos (`start-session`, `start-hu`, `validate-hu`, `code-review`, `review-status`, `commit`, `close-session`); sus archivos son la fuente del procedimiento detallado.
