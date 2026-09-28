# Estado actual del proyecto

> Este archivo representa el punto de entrada principal para una sesión nueva.
> Debe mantenerse breve, actualizado y orientado al estado actual.

## Última actualización

2026-09-28

## Estado general

Sprint 0 registrado como completado en el backlog, con pendientes de revalidación detectados antes de iniciar el MVP.

## Trabajo actual

### EN-001 — Inicializar repositorio y estructura base
Estado: Done (2026-09-28)

### EN-002 — Crear aplicación web Angular
Estado: Done (2026-09-28)

### EN-003 — Crear API base con NestJS
Estado: Done (2026-09-28)

### EN-004 — Configurar variables de entorno y secretos
Estado: Done (2026-09-28)

### EN-005 — Definir scripts de calidad y ejecución
Estado: Done (2026-09-28)

### EN-006 — Exponer health check de la API
Estado: Done (2026-09-28)

## Próximo trabajo recomendado

1. Homologar `develop` con `main` con autorización explícita, siguiendo `docs/GIT_WORKFLOW.md`.
2. Revalidar pendientes de Sprint 0 antes del MVP: carga de `.env` y lint web (formato no sustituye lint); verificar arranque y health check por HTTP.
3. Refinar AUTH-001 (autenticación) y CAT-001 (catálogo) antes de implementarlas en ramas desde `develop`.

## Flujo de desarrollo acordado

- Base del MVP: `develop`; ramas por HU y PRs hacia `develop`. Commits y publicación solo por solicitud explícita.
- Inspección local del 2026-09-28: `main` en `b8323e6`, `develop` en `0368103`; `develop...main` devuelve `0 8`. No se consultó el remoto con fetch en esta revisión.
- Homologación aún pendiente; no se modificaron referencias Git durante el refinamiento de skills. Los estados `Done` anteriores requieren la revalidación indicada, no constituyen evidencia nueva.

## Decisiones técnicas confirmadas

- Angular 21.2.6.
- Node.js 24.14.1.
- NestJS.
- TypeScript.
- SCSS.
- API REST.
- PostgreSQL como dirección de persistencia.

## Decisiones pendientes

- ORM / acceso a datos.
- Uso definitivo de Supabase.
- Proveedor de autenticación.
- API externa de catálogo de videojuegos.
- Librería UI.
- Estrategia de despliegue.

## Bloqueadores actuales

Antes del MVP falta homologar la base de desarrollo y verificar los pendientes de Sprint 0.

## Próximo punto de entrada

Revisar los cambios de skills y `docs/GIT_WORKFLOW.md`; luego acordar la homologación de `develop` con `main` y la revalidación pendiente.
