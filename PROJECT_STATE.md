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

1. Refinar AUTH-001 (autenticación) y CAT-001 (catálogo) antes de implementarlas en ramas desde `develop`.
2. Considerar agregar lint al web (actualmente solo tiene formato con Prettier).

## Flujo de desarrollo acordado

- Base del MVP: `develop`; ramas por HU y PRs hacia `develop`. Commits y publicación solo por solicitud explícita.
- Homologación local realizada el 2026-09-28: `git merge --ff-only main` avanzó `develop` desde `0368103` hasta `b8323e6`. `main` y `develop` apuntan al mismo commit; `develop...main` devuelve `0 0` y no hay diferencias entre sus árboles.
- Refinamiento guardado en `299c8df` sobre `chore/refine-skills-workflow`, creada desde el tip de `main` antes del fast-forward (ahora también base de `develop`). Esta es la rama de trabajo para retomar la sesión con las skills actualizadas; su integración en `develop` está pendiente.
- `git fetch origin` falló con `Permission denied (publickey)`. La referencia local `origin/develop` sigue en `0368103`; `develop` está 8 commits por delante de esa referencia, pero el estado actual en GitHub no pudo verificarse. No se realizó push ni PR.
- Los estados `Done` anteriores requieren la revalidación indicada, no constituyen evidencia nueva.

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

Ninguno registrado.

## Próximo punto de entrada

Reiniciar OpenCode en `chore/refine-skills-workflow`, resolver el acceso SSH y verificar el remoto. Después acordar publicación/PR del refinamiento y retomar la revalidación de Sprint 0.
