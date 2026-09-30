---
name: start-session
description: Usa esta skill al iniciar o retomar una sesión de desarrollo de Backlog Gamer para reconstruir el contexto actual antes de modificar código.
---

# Iniciar sesión de desarrollo

Reconstruye el estado actual del proyecto con la menor cantidad de contexto posible.

## Fuentes obligatorias

Lee, en este orden:

1. `AGENTS.md`
2. `PROJECT_STATE.md`
3. `BACKLOG_GAMER.md`

Después:

4. Busca el Daily más reciente en `docs/daily/`, si existe; `DAILY_TEMPLATE.md` no es un Daily.
5. Revisa `git status`.
6. Revisa los commits recientes con `git log --oneline -10`.
7. Inspecciona únicamente el código relacionado con la HU activa o el próximo trabajo recomendado.

No leas todos los Dailies históricos.

## Contexto de ramas

Lee `docs/GIT_WORKFLOW.md` y revisa `git branch -avv`. Informa rama actual, upstream, cambios locales y si la rama de trabajo parte de `develop`. Consulta la relación `develop...main` antes del primer trabajo del MVP: la homologación inicial no se presume realizada. Indica si las referencias remotas fueron actualizadas o son solo las disponibles localmente.

Iniciar sesión no autoriza cambiar de rama, homologar ni crear commits. La preparación de una rama de implementación corresponde a `start-hu`.

## Regla de autoridad

Si existe una contradicción:

1. El código y Git representan lo realmente implementado.
2. `PROJECT_STATE.md` representa el resumen esperado del estado actual.
3. `BACKLOG_GAMER.md` representa los requisitos y estado administrativo de las HUs.
4. Los Dailies representan historia, no necesariamente estado actual.

Informa cualquier inconsistencia relevante antes de modificar código.

## Salida esperada

Resume:

- estado general;
- rama actual y estado de integración con `develop`;
- HU activa, si existe;
- último trabajo completado;
- trabajo pendiente;
- blockers conocidos;
- próximo paso recomendado.

Sé breve.

## Restricción

No modifiques código durante esta skill salvo que el usuario también haya pedido explícitamente continuar o implementar una tarea.
