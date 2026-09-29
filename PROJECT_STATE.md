# Estado actual del proyecto

> Este archivo representa el punto de entrada principal para una sesión nueva.
> Debe mantenerse breve, actualizado y orientado al estado actual.

## Última actualización

2026-09-29

## Estado general

MVP en progreso. AUTH-001 completada y mergeada en develop.

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

### AUTH-001 — Autenticarme en la aplicación
Estado: Done (2026-09-29)

## Próximo trabajo recomendado

1. Implementar CAT-001 (búsqueda de catálogo).
2. Considerar agregar lint al web (actualmente solo tiene formato con Prettier).

## Flujo de desarrollo acordado

- Base del MVP: `develop`; ramas por HU y PRs hacia `develop`.
- Commits y publicación solo por solicitud explícita.
- Ver `docs/GIT_WORKFLOW.md` para el procedimiento completo.

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

Implementar CAT-001 desde la rama `feat/cat-001-catalogo-videojuegos` (ya creada, vacía).
