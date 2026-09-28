---
name: start-hu
description: Usa esta skill cuando el usuario quiera comenzar, refinar o continuar una Historia de Usuario o Enabler específico del backlog.
argument-hint: "[HU-ID]"
---

# Comenzar HU

HU objetivo: `$ARGUMENTS`

Si la skill se carga sin sustitución de `$ARGUMENTS`, toma el ID del pedido del usuario. Si falta o hay ambigüedad, acláralo antes de modificar el backlog.

## Paso 1 — Resolver la HU

Busca `$ARGUMENTS` en `BACKLOG_GAMER.md`.

Si no existe, informa el problema y no inventes una HU.

## Paso 2 — Revisar estado actual

Lee:

- `PROJECT_STATE.md`;
- la HU y sus dependencias;
- el último Daily solo si menciona la HU o una dependencia;
- código actualmente relacionado con la feature.

Revisa `git status` antes de proponer cambios.

## Paso 3 — Refinamiento

Explica brevemente:

### Objetivo
Qué valor entrega.

### Alcance
Qué debe quedar funcionando.

### Dependencias
Qué debe existir antes.

### Casos borde
Solo los realmente relevantes.

## Paso 4 — Diseño técnico

Define únicamente lo necesario para esta HU.

Cuando aplique:

- modelo de dominio;
- persistencia;
- endpoints;
- DTOs;
- validaciones;
- autorización;
- componentes Angular;
- servicios;
- integraciones externas;
- tests.

No diseñes features futuras por anticipado.

## Paso 5 — Plan de implementación

Divide el trabajo en tareas pequeñas y ordenadas.

Ejemplo:

```text
1. definir contrato
2. implementar backend
3. agregar tests
4. implementar cliente Angular
5. implementar UI
6. validar criterios
```

Adapta el plan a la HU real.

## Paso 5 bis — Preparar rama

Antes de la primera edición de implementación (incluido el estado de la HU), sigue `docs/GIT_WORKFLOW.md`: comprobar árbol de trabajo y referencias, verificar `develop` y crear/reutilizar una rama adecuada para la HU. No implementar sobre `main` o `develop`.

La homologación inicial pendiente entre `main` y `develop` debe resolverse explícitamente antes del MVP. No crear una rama de feature desde una base atrasada para sortear ese pendiente. Registrar la rama elegida en `PROJECT_STATE.md` al iniciar la implementación. El refinamiento por sí solo no cambia ramas ni estado de la HU.

## Paso 6 — Estado

Cuando comience implementación real:

```text
Estado -> In Progress
```

Actualiza `BACKLOG_GAMER.md` únicamente si realmente se empieza a trabajar.

## Modo pedagógico

Por defecto:

- explica el razonamiento técnico necesario;
- ofrece orientación y pistas;
- no ocultes archivos o responsabilidades importantes.

Si el usuario pide implementación completa, procede con ella.

## Restricciones

- No agregar dependencias sin justificar.
- No introducir arquitectura futura.
- No modificar criterios de aceptación silenciosamente.
- No marcar `Done` desde esta skill.
- Al terminar implementación, usar `validate-hu` y reportar evidencia antes de proponer `Done`. No confundir build, arranque, lint, formato y pruebas HTTP.
- No ejecutar commits, push, PR ni merges de entrega por una petición genérica de continuar; aplicar las autorizaciones de `docs/GIT_WORKFLOW.md`.
