---
name: commit
description: Usa esta skill cuando el usuario pida preparar o realizar un commit Git del trabajo actual con un mensaje coherente y seguro.
disable-model-invocation: true
---

# Crear commit

Esta skill tiene efectos sobre Git y debe ejecutarse solo por petición explícita del usuario.

Si se pide solo sugerir un mensaje, devolver el mensaje sin stage ni commit. Una autorización para un commit concreto no se extiende automáticamente a HUs posteriores.

## Regla principal

Nunca hagas push.

No uses `git add .` automáticamente sin revisar primero qué archivos existen.

## Paso 1 — Inspeccionar

Ejecuta:

```bash
git status
git diff
git diff --staged
git log --oneline -10
git branch -avv
```

Identifica:

- archivos modificados;
- archivos nuevos;
- secretos accidentales;
- cambios no relacionados;
- documentación de sesión;
- artefactos generados que no deberían versionarse.

Seguir `docs/GIT_WORKFLOW.md`: confirmar rama de trabajo basada en `develop`. Si la rama actual es `main` o `develop`, detener el commit y proponer una rama adecuada; una excepción requiere autorización explícita. No mover cambios ni homologar como efecto secundario del commit.

## Paso 2 — Seguridad

Antes de agregar archivos, busca indicios evidentes de:

- `.env`;
- tokens;
- API keys;
- passwords;
- archivos de credenciales;
- dumps;
- archivos temporales;
- dependencias generadas.

Nunca agregues secretos al commit.

Si detectas algo sospechoso, detén el commit e informa.

## Paso 3 — Determinar scope

Agrupa únicamente cambios relacionados.

Si existen cambios claramente independientes, propone commits separados.

No mezcles por comodidad:

- refactors no relacionados;
- cambios de formato masivos;
- documentación ajena;
- experimentos temporales.

## Paso 4 — Verificación

Antes del commit, ejecuta los checks relevantes al scope cuando sea razonable.

Ejemplos:

```text
lint
tests
build
```

No inventes comandos: utiliza los definidos en el repositorio.

Si un check falla, no ocultes el fallo.

Registrar comandos, resultados y checks no ejecutados. Reutilizar resultados previos solo si cubren el mismo código/configuración; un script existente no equivale a un check aprobado.

## Paso 5 — Mensaje

Usa Conventional Commits:

```text
feat:
fix:
refactor:
test:
docs:
chore:
```

Cuando ayude, agrega scope:

```text
feat(api): add health endpoint
feat(library): add game status update
chore(web): configure angular project
```

El título:

- imperativo;
- concreto;
- corto;
- describe el cambio principal.

## Paso 6 — Stage

Agrega explícitamente los archivos que pertenecen al commit.

Preferir:

```bash
git add path1 path2 path3
```

sobre:

```bash
git add .
```

## Paso 7 — Commit

Ejecuta el commit solo después de verificar el contenido staged:

```bash
git diff --staged
git diff --staged --check
```

Después:

Comprobar que el stage contiene solo los archivos acordados. En PowerShell 5.1 no usar `&&` ni ejecutar el commit después de un `git add` fallido; seguir `docs/GIT_WORKFLOW.md`.

```bash
git commit -m "<mensaje>"
```

## Paso 8 — Resultado

Informa:

- hash corto;
- mensaje;
- archivos incluidos;
- checks ejecutados;
- si quedaron cambios fuera del commit.
- rama del commit y resultado de `git status --short --branch` después de crearlo.

## Prohibido

- `git push`;
- `git push --force`;
- amend de commits previos salvo petición explícita;
- borrar cambios del usuario;
- saltarse hooks con `--no-verify` salvo petición explícita y justificada.
