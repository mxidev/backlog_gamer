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

4. Busca el Daily más reciente en `docs/daily/`, si existe.
5. Revisa `git status`.
6. Revisa los commits recientes con `git log --oneline -10`.
7. Inspecciona únicamente el código relacionado con la HU activa o el próximo trabajo recomendado.

No leas todos los Dailies históricos.

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
- HU activa, si existe;
- último trabajo completado;
- trabajo pendiente;
- blockers conocidos;
- próximo paso recomendado.

Sé breve.

## Restricción

No modifiques código durante esta skill salvo que el usuario también haya pedido explícitamente continuar o implementar una tarea.
