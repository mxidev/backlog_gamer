# Estado actual del proyecto

> Este archivo representa el punto de entrada principal para una sesión nueva.
> Debe mantenerse breve, actualizado y orientado al estado actual.

## Última actualización

2026-10-01

## Estado general

MVP en progreso. Sprint 0 completado. HUs de autenticación, catálogo y biblioteca completadas (AUTH-001, CAT-001, LIB-001 a LIB-006). Fix de JWT secret aplicado.

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

### CAT-001 — Buscar videojuegos en un catálogo
Estado: Done (2026-09-30)

### LIB-001 — Agregar un videojuego a mi biblioteca
Estado: Done (2026-09-30)

### LIB-002 — Ver mi biblioteca de videojuegos
Estado: Done (2026-09-30)

### LIB-003 — Cambiar el estado de un videojuego
Estado: Done (2026-09-30)

### LIB-004 — Registrar información personal de un videojuego
Estado: Done (2026-09-30)

### LIB-005 — Eliminar un videojuego de mi biblioteca
Estado: Done (2026-09-30)

### LIB-006 — Buscar, filtrar y ordenar mi biblioteca
Estado: Done (2026-10-01)

## Próximo trabajo recomendado

1. Implementar DASH-001 (ver un resumen de mi backlog).
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
- Proveedor de autenticación (actualmente JWT custom).
- Librería UI.
- Estrategia de despliegue.

## Decisiones técnicas confirmadas (MVP)

- RAWG API para catálogo de videojuegos.
- JWT con access token para autenticación.
- Storage in-memory para usuarios (sin DB aún).

## Bloqueadores actuales

Ninguno registrado.

## Próximo punto de entrada

Implementar DASH-001 (ver un resumen de mi backlog) o UX-001 (recibir estados claros de carga, vacío y error).
