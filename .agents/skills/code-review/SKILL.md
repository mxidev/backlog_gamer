---
name: code-review
description: Usa esta skill cuando el usuario pida revisar código, una HU implementada, cambios locales o una feature antes de marcarla como terminada.
argument-hint: "[HU-ID|path|scope]"
---

# Code Review

Scope solicitado: `$ARGUMENTS`

Si `$ARGUMENTS` no fue sustituido, usar el alcance indicado en la conversación; aclararlo si es ambiguo.

Haz una revisión orientada a defectos y cumplimiento de requerimientos, no a preferencias estéticas.

## Contexto mínimo

Lee:

1. `AGENTS.md`;
2. la HU relacionada en `BACKLOG_GAMER.md`, si existe;
3. `PROJECT_STATE.md` solo si necesitas entender el estado de la feature.

## Código a revisar

Si hay cambios locales:

```bash
git status
git diff
git diff --staged
```

Si el usuario especifica un commit/rango, revisa ese rango.

Si especifica una HU, identifica los archivos relacionados mediante Git y búsqueda en el repositorio.

Para una rama de feature, seguir `docs/GIT_WORKFLOW.md`: comprobar la base y revisar `git log --oneline develop..HEAD` y `git diff develop...HEAD`, además de cambios locales y archivos nuevos. Revisar todos los commits de la feature, no solo el último. Una review no cambia ramas ni hace merges.

No revises todo el repositorio sin necesidad.

## Prioridades

Busca en este orden:

1. Bugs funcionales.
2. Incumplimiento de criterios de aceptación.
3. Problemas de autorización o seguridad.
4. Pérdida/corrupción de datos.
5. Manejo incorrecto de errores.
6. Casos borde importantes.
7. Tests ausentes para lógica relevante.
8. Acoplamiento o complejidad innecesaria.
9. Mantenibilidad.

No conviertas preferencias de estilo en findings importantes.

## Angular

Considera cuando aplique:

- manejo de subscriptions;
- estado derivado innecesariamente duplicado;
- uso apropiado de Signals/RxJS;
- errores HTTP;
- estados loading/empty/error;
- accesibilidad básica;
- validación de formularios;
- exposición de secretos.

## NestJS

Considera cuando aplique:

- validación de DTOs;
- autorización server-side;
- status codes;
- manejo de excepciones;
- aislamiento del proveedor externo;
- separación controller/service;
- acceso inseguro a datos;
- tests de reglas de negocio.
- carga efectiva de `.env` y validación antes del arranque, no solo existencia de un archivo de ejemplo;
- endpoints probados por HTTP, incluidos guards y registro de módulos; una llamada directa al controller no verifica routing ni status codes.

Para checks y versiones, aplicar el estándar de evidencia de `validate-hu`: Prettier no sustituye lint, build no sustituye arranque y rangos del manifiesto no prueban la versión instalada.

## Formato de findings

Ordena por severidad:

```text
[Alta] Título
Archivo: ruta:línea
Problema:
Impacto:
Corrección sugerida:
```

Severidades:

- Alta: bug, seguridad, pérdida de datos o incumplimiento crítico.
- Media: comportamiento incorrecto o riesgo relevante.
- Baja: problema real de mantenibilidad o calidad.

## Si no hay findings

Indica explícitamente que no encontraste problemas relevantes.

Después menciona riesgos residuales o tests que no pudiste verificar, si existen.

## Restricción

No modifiques código durante la review salvo que el usuario pida aplicar los cambios.
