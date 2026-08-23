# Guía del Repositorio

## Estructura

* `apps/web` contiene el frontend standalone en Angular 21. La aplicación inicia `src/app/app.ts` desde `src/main.ts`; agrega la navegación en `src/app/app.routes.ts` y los providers globales de la aplicación en `src/app/app.config.ts`.
* `apps/api` contiene la API en NestJS. `src/main.ts` escucha en la variable `PORT` o, en su defecto, en el puerto `3000`; registra las funcionalidades de la API en `AppModule`.
* Las aplicaciones son proyectos npm separados y cada una tiene su propio archivo `package-lock.json`. Ejecuta `npm install` y todos los scripts npm desde el directorio de la aplicación correspondiente, no desde la raíz del repositorio.

## Comandos

* Frontend (`apps/web`): `npm start` levanta el entorno de desarrollo en el puerto 4200; `npm run build` genera el build de producción; `npm test` ejecuta los tests unitarios de Angular usando Vitest.
* API (`apps/api`): `npm run start:dev` inicia NestJS en modo watch; `npm run build` compila la aplicación en `dist`; `npm test` ejecuta los tests unitarios ubicados bajo `src`, ya que `rootDir` de Jest está configurado como `src`; `npm run test:e2e` utiliza `test/jest-e2e.json` para ejecutar archivos `test/**/*.e2e-spec.ts`.
* En la API, `npm run lint` ejecuta ESLint con `--fix`, por lo que puede modificar archivos. Su configuración con análisis de tipos requiere el proyecto TypeScript local; no debe tratarse como una verificación de solo lectura.

## Formato

* Prettier en la API utiliza comillas simples y comas finales.
* Prettier en el frontend utiliza comillas simples, un ancho máximo de 100 caracteres y el parser de Angular para archivos HTML.
* Los componentes Angular utilizan SCSS por defecto y el prefijo de selector `app`; los estilos globales del frontend se encuentran en `apps/web/src/styles.scss`.

---

## Proyecto

Aplicación web personal para gestionar un backlog de videojuegos.

## Stack

- Angular 21.2.6
- Node.js 24.14.1
- NestJS
- TypeScript
- SCSS
- PostgreSQL
- npm
- Git

## Fuentes de contexto

- `PROJECT_STATE.md`: estado actual resumido.
- `BACKLOG_GAMER.md`: requisitos, criterios de aceptación y estado de HUs.
- `docs/daily/`: historial diario; no leer completo salvo necesidad.
- `docs/snapshots/`: snapshots históricos; consultar solo cuando ayuden.

El código y Git son la evidencia final de lo realmente implementado.

## Principios

- Priorizar simplicidad y mantenibilidad.
- Evitar sobrearquitectura.
- No inventar requisitos.
- No agregar dependencias sin necesidad.
- Backend como frontera para secretos, autorización y APIs externas.
- Organizar por feature cuando sea razonable.
- Tests donde exista lógica o riesgo real.

## Decisiones abiertas

No asumir como resueltas sin revisar:

- ORM / acceso a datos.
- uso definitivo de Supabase;
- autenticación;
- proveedor de catálogo;
- librería UI;
- despliegue.

## Definition of Done

Una HU puede estar `Done` cuando:

- cumple criterios de aceptación;
- compila;
- lint y tests relevantes pasan;
- errores importantes están manejados;
- autorización fue considerada si aplica;
- no se filtraron secretos;
- contexto/documentación afectada quedó actualizada.

## Skills del proyecto

Usa las skills disponibles para workflows repetibles:

- `start-session`: reconstruir contexto al iniciar.
- `close-session`: persistir estado al finalizar.
- `start-hu`: refinar/comenzar una HU.
- `review-status`: auditar documentación vs código.
- `code-review`: revisar cambios o una HU.
- `validate-hu`: valida una HU contra sus criterios de aceptación antes de marcarla `Done`.
- `commit`: preparar y crear commits seguros.

No dupliques dentro de este archivo los procedimientos completos definidos por las skills.
