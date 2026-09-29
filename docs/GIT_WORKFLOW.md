# Flujo Git de desarrollo

## Ramas y alcance

- `develop` es la base de desarrollo e integración del MVP. `main` recibe entregas estabilizadas; no implementar HUs directamente en ninguna de las dos.
- Crear una rama por HU/Enabler desde `develop`: `feat/auth-001-autenticacion`, `feat/cat-001-busqueda-catalogo`, `fix/<id>-<descripcion>` o `chore/<id>-<descripcion>`. Usar minúsculas y guiones; para mantenimiento sin HU, omitir el ID.
- Una HU que abarca API y web puede compartir rama. Separar commits por cambio coherente cuando corresponda, no crear ramas por aplicación automáticamente.
- Integrar ramas de trabajo mediante PR hacia `develop`. La promoción `develop` → `main` es un paso separado, solicitado por el usuario.

## Antes de comenzar implementación

1. Revisar `git status --short --branch`, `git branch -avv` y los últimos commits. Identificar cambios staged, archivos nuevos y trabajo previo antes de cambiar de rama.
2. Comprobar las referencias remotas con `git fetch origin` cuando exista ese remoto. Si no se puede consultar, informar que la comparación usa referencias locales; no afirmar que están actualizadas.
3. Si falta `develop` local y existe `origin/develop`, se puede crear con `git switch --track origin/develop` con el árbol limpio. Cuando ambas existan, comparar `git rev-list --left-right --count develop...origin/develop`; los números representan commits exclusivos de la izquierda y la derecha.
4. Con `develop` local disponible y el árbol limpio, cambiar a ella; si solo está atrasada respecto de `origin/develop`, actualizar con `git merge --ff-only origin/develop`. Si divergen, no elegir una resolución automáticamente.
5. Antes del primer trabajo del MVP, comprobar la homologación inicial con `main` según la sección siguiente.
6. Crear y activar la rama con `git switch -c feat/<id>-<descripcion> develop` antes de editar código o cambiar el estado de la HU. Si ya existe una rama para la tarea, inspeccionar su base y cambios antes de reutilizarla.

Si hay cambios locales que impidan cambiar de rama, una base ausente o divergencia, explicar el caso y acordar cómo continuar. No usar stash, reset, descarte, rebase ni movimiento de commits automáticamente. En tareas de consulta o refinamiento sin implementación de la HU no hace falta crear su rama.

## Homologación inicial de develop con main

Este paso es previo al MVP y requiere petición explícita; no es un merge rutinario en cada HU.

1. Revisar ambas ramas y sus upstreams después del fetch. Confirmar que se comparan los tips correctos.
2. Ejecutar `git rev-list --left-right --count develop...main` y `git log --oneline develop..main`.
3. Si el resultado es `0 N`, `develop` es ancestro de `main`. Con el árbol limpio y autorización, ejecutar por separado:

   ```text
   git switch develop
   git merge --ff-only main
   ```

4. Si hay commits exclusivos en ambas ramas, presentar la divergencia y acordar la estrategia. No forzar la homologación.
5. Verificar las referencias tras la operación. Actualizar `origin/develop` requiere un push solicitado explícitamente; un fast-forward local no publica nada.

## Commits y entrega

- Pedir implementar o continuar una HU no autoriza commits, push, PR ni merges de entrega. La skill `commit` requiere una petición explícita para crear commits; pedir solo un mensaje no autoriza ejecutarlo.
- Antes de un commit, revisar el diff staged final y la rama actual. No crear commits en `main` o `develop` salvo excepción explícita del usuario.
- Usar Conventional Commits (`feat(api): ...`, `feat(web): ...`, `fix(api): ...`, `docs: ...`, `chore: ...`); mencionar la HU cuando aclare el alcance.
- Si se solicita una PR, revisar todos los commits de la rama y `git diff develop...HEAD`, incluyendo checks pendientes. Usar `gh` y `--base develop`; informar la URL. El push necesario para publicar la rama también requiere autorización.
- `READY_FOR_DONE` expresa validación funcional, no integración. Informar por separado rama, commits locales, publicación, PR y merge; un commit no cierra por sí solo una HU.

## PowerShell

El entorno usa PowerShell 5.1: no encadenar con `&&`. Para operaciones dependientes, ejecutar comandos separados comprobando éxito o usar `if ($LASTEXITCODE -eq 0) { ... }`. Nunca continuar con un commit si falló el stage o un check requerido.
