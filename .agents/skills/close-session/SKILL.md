---
name: close-session
description: Usa esta skill cuando el usuario diga que quiere cerrar, finalizar o guardar el estado de una sesión de desarrollo de Backlog Gamer.
---

# Cerrar sesión de desarrollo

Deja el proyecto preparado para que una sesión futura pueda retomarlo sin depender de la conversación actual.

## Procedimiento

### 1. Inspeccionar estado real

Revisa:

```bash
git status
git diff
git log --oneline -10
```

Identifica:

- HUs trabajadas;
- cambios implementados;
- tests ejecutados;
- trabajo incompleto;
- blockers;
- decisiones tomadas.

### 2. Validar HUs

Para cada HU trabajada:

1. Lee sus criterios en `BACKLOG_GAMER.md`.
2. No marques `Done` si todavía falta un criterio relevante.
3. Usa:
   - `In Progress` si queda implementación pendiente.
   - `Blocked` si existe un impedimento concreto.
   - `Review` si está implementada pero necesita validación.
   - `Done` solo si cumple Definition of Done definida en `AGENTS.md`.

### 3. Actualizar BACKLOG_GAMER.md

Actualiza únicamente estados o información realmente afectada.

No reescribas HUs completas sin necesidad.

### 4. Actualizar PROJECT_STATE.md

Debe quedar corto.

Incluye como máximo:

- fecha de actualización;
- HU actual;
- trabajo terminado;
- trabajo pendiente;
- blockers;
- decisiones abiertas relevantes;
- próximo punto de entrada.

No conviertas `PROJECT_STATE.md` en un historial.

### 5. Crear o actualizar Daily

Ruta:

```text
docs/daily/DD-MM-YYYY.md
```

Si ya existe un Daily para la fecha actual, actualízalo en lugar de crear otro.

Debe registrar:

- objetivo;
- HUs trabajadas;
- estado inicial y final;
- trabajo realizado;
- archivos relevantes;
- problemas encontrados;
- causa y solución de blockers;
- decisiones;
- tests;
- pendiente;
- próximo paso;
- commits relevantes si existen.

Preserva problemas y aprendizajes aunque hayan sido resueltos.

### 6. Crear snapshot solo si aporta valor

Ruta:

```text
docs/snapshots/DD-MM-YYYY.md
```

Créalo o actualízalo cuando exista al menos una de estas condiciones:

- una HU cambió de estado;
- una feature importante terminó;
- cambió arquitectura o infraestructura;
- apareció o se resolvió un blocker importante;
- el estado general del proyecto cambió significativamente.

No crear snapshots vacíos o redundantes.

### 7. Verificación final

Comprueba que una sesión nueva pueda responder únicamente con los archivos persistidos:

- qué está hecho;
- qué falta;
- qué HU sigue;
- qué blocker existe;
- dónde continuar.

## Salida final

Entrega un resumen corto:

```text
Sesión cerrada

HUs:
- XXX -> estado

Daily:
- ruta

Snapshot:
- ruta o "no necesario"

Próximo paso:
- acción concreta
```

No hagas `git commit` automáticamente. El commit se gestiona mediante la skill `commit`.
