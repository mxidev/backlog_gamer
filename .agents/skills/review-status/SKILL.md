---
name: review-status
description: Usa esta skill para auditar el estado real del proyecto, detectar diferencias entre documentación, backlog, Git y código, y recomendar el siguiente trabajo.
---

# Revisar estado del proyecto

Realiza una auditoría ligera del estado actual.

## Leer

1. `AGENTS.md`
2. `PROJECT_STATE.md`
3. `BACKLOG_GAMER.md`
4. último Daily
5. último snapshot, solo si existe y aporta contexto

## Inspeccionar Git

Ejecuta o revisa:

```bash
git status
git log --oneline -10
```

Consulta `git diff` cuando existan cambios sin commit.

## Verificar HUs relevantes

No audites todo el backlog en profundidad.

Prioriza:

1. HUs `In Progress`;
2. HUs `Review`;
3. HUs `Blocked`;
4. últimas HUs marcadas `Done`;
5. próximo item recomendado.

Para una HU marcada `Done`, verifica de manera razonable que exista evidencia en código/tests de los criterios principales.

## Detectar inconsistencias

Busca situaciones como:

- HU `Done` sin implementación suficiente;
- `PROJECT_STATE.md` desactualizado;
- código implementado pero HU todavía `Backlog`;
- blocker resuelto pero aún registrado como activo;
- cambios locales sin registrar;
- próximo paso incompatible con dependencias.

No corrijas silenciosamente.

## Salida

Usa esta estructura:

### Estado actual
Resumen de 3-6 líneas.

### Inconsistencias
Solo si existen.

### Trabajo activo
HU + estado + pendiente.

### Riesgos / blockers
Solo los concretos.

### Próximo paso recomendado
Una acción principal.

## Modo reparación

Si el usuario pide corregir el estado documental, actualiza:

- `PROJECT_STATE.md`;
- estados necesarios en `BACKLOG_GAMER.md`.

No modifiques código salvo solicitud explícita.
---
name: review-status
description: Usa esta skill para auditar el estado real del proyecto, detectar diferencias entre documentación, backlog, Git y código, y recomendar el siguiente trabajo.
---

# Revisar estado del proyecto

Realiza una auditoría ligera del estado actual.

## Leer

1. `AGENTS.md`
2. `PROJECT_STATE.md`
3. `BACKLOG_GAMER.md`
4. último Daily
5. último snapshot, solo si existe y aporta contexto

## Inspeccionar Git

Ejecuta o revisa:

```bash
git status
git log --oneline -10
```

Consulta `git diff` cuando existan cambios sin commit.

## Verificar HUs relevantes

No audites todo el backlog en profundidad.

Prioriza:

1. HUs `In Progress`;
2. HUs `Review`;
3. HUs `Blocked`;
4. últimas HUs marcadas `Done`;
5. próximo item recomendado.

Para una HU marcada `Done`, verifica de manera razonable que exista evidencia en código/tests de los criterios principales.

## Detectar inconsistencias

Busca situaciones como:

- HU `Done` sin implementación suficiente;
- `PROJECT_STATE.md` desactualizado;
- código implementado pero HU todavía `Backlog`;
- blocker resuelto pero aún registrado como activo;
- cambios locales sin registrar;
- próximo paso incompatible con dependencias.

No corrijas silenciosamente.

## Salida

Usa esta estructura:

### Estado actual
Resumen de 3-6 líneas.

### Inconsistencias
Solo si existen.

### Trabajo activo
HU + estado + pendiente.

### Riesgos / blockers
Solo los concretos.

### Próximo paso recomendado
Una acción principal.

## Modo reparación

Si el usuario pide corregir el estado documental, actualiza:

- `PROJECT_STATE.md`;
- estados necesarios en `BACKLOG_GAMER.md`.

No modifiques código salvo solicitud explícita.
