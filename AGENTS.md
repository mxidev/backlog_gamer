# Guía del repositorio

## Aplicaciones y comandos

- `apps/web` y `apps/api` son proyectos npm independientes con su propio `package-lock.json`; no hay `package.json` ni workspace en la raíz. Ejecuta `npm install` y los scripts desde la carpeta de cada app.
- Requisitos documentados: Node.js 24.x y npm 11.x.

### Web (Angular 21)

- `npm start` — servidor de desarrollo en `http://localhost:4200`.
- `npm run build` — build de producción.
- `npm test` — tests a través del builder `@angular/build:unit-test` (`ng test` con Vitest). No pases flags de Vitest directamente por `ng test`.
- `npm run format` / `npm run format:check` — Prettier. No hay lint configurado todavía.

### API (NestJS)

- `npm run start:dev` — servidor en modo watch, escucha en el puerto definido por `PORT`.
- `npm run build` — compila a `dist/` (`nest-cli.json` borra `deleteOutDir` antes).
- `npm test` — tests unitarios bajo `src` (Jest `rootDir` es `src`, regex `.*\.spec\.ts$`).
- `npm run test:e2e` — usa `test/jest-e2e.json` y los archivos `test/**/*.e2e-spec.ts`.
- `npm run lint` — ESLint **con `--fix`**, modifica archivos; no es una comprobación de solo lectura.
- `npm run format` — Prettier.

## Variables de entorno de la API

- `apps/api/.env` se carga automáticamente como efecto secundario de importar `src/constants.ts` (usa `dotenv` apuntando a `../.env` relativo a `__dirname`), que a su vez importa `src/config.ts`.
- Aun así, `src/config.ts` valida de forma estricta `PORT` y `RAWG_API_KEY`; si faltan o son inválidas, `loadConfig()` lanza error. `JWT_SECRET` se lee de `.env` pero tiene un fallback por defecto.
- Copia `apps/api/.env.example` a `.env` y rellena al menos `PORT` y `RAWG_API_KEY` antes de arrancar.

## Estructura

- Web: aplicación standalone. `src/main.ts` arranca `App` (`src/app/app.ts`). Rutas en `src/app/app.routes.ts`, providers globales en `src/app/app.config.ts`. Componentes con prefijo `app` y estilos SCSS; estilos globales en `src/styles.scss`; Bootstrap grid se carga desde `angular.json`.
- API: `src/main.ts` inicia `AppModule`; registra nuevos módulos de dominio importándolos en `AppModule`.

## Formato

- Web (`.prettierrc`): comillas simples, ancho 100, parser Angular para HTML.
- API (`.prettierrc`): comillas simples y comas finales.

## Contexto del producto y flujo de trabajo

- `BACKLOG_GAMER.md` contiene el backlog con HUs, criterios de aceptación y estados; `PROJECT_STATE.md` resume el estado actual y decisiones. Verifica ambos contra el código y Git antes de asumir que algo está implementado.
- Base de desarrollo del MVP: `develop`. Crear una rama por HU/Enabler (`feat/<id>-...`) y dirigir PRs a `develop`. Ver procedimiento completo en `docs/GIT_WORKFLOW.md`.
- Commits, push, PR y merges de entrega requieren petición explícita.
- Usa las skills de `.agents/skills/` para workflows concretos: `start-session`, `start-hu`, `validate-hu`, `code-review`, `review-status`, `commit`, `close-session`.
- Mantén secretos, autorización e integraciones externas en el backend. No des por decididas persistencia/ORM, Supabase, proveedor de autenticación definitivo, librería UI o estrategia de despliegue sin evidencia actual.
