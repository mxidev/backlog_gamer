---
name: validate-hu
description: Usa esta skill cuando una Historia de Usuario o Enabler esté cerca de finalizar y sea necesario validar objetivamente si cumple sus criterios de aceptación y la Definition of Done antes de marcarla como Done.
argument-hint: '[HU-ID]'
---

# Validar Historia de Usuario

HU objetivo: `$ARGUMENTS`

Si `$ARGUMENTS` no fue sustituido, obtener el ID de la petición del usuario; no buscar el texto literal como ID.

El propósito de esta skill es determinar si una HU puede considerarse realmente terminada.

No debe asumir que una HU está lista solo porque existe código implementado o porque el desarrollador considera que "ya funciona".

La validación debe basarse en:

- criterios de aceptación;
- Definition of Done;
- estado real del código;
- tests;
- comportamiento observable;
- dependencias relevantes.

---

## 1. Resolver la HU

Busca `$ARGUMENTS` en:

```text
BACKLOG_GAMER.md
```

Obtén:

* título;
* descripción;
* estado actual;
* criterios de aceptación;
* dependencias;
* prioridad;
* Story Points si existen.

Si la HU no existe:

* informa el problema;
* no inventes criterios;
* no continúes con la validación.

---

## 2. Cargar contexto mínimo

Lee:

1. `AGENTS.md`;
2. la HU correspondiente en `BACKLOG_GAMER.md`;
3. `PROJECT_STATE.md`;
4. el Daily más reciente únicamente si contiene información relevante sobre la HU.

No leas todo el historial del proyecto salvo que sea necesario para resolver una inconsistencia.

---

## 3. Inspeccionar el estado real

Revisa:

```bash
git status
git diff
git diff --staged
```

Cuando sea útil:

```bash
git log --oneline -10
```

Identifica los archivos relacionados con la HU.

Inspecciona únicamente el código necesario para evaluar sus criterios.

Seguir `docs/GIT_WORKFLOW.md`: identificar rama, base y cambios de toda la HU contra `develop`, además del diff local. No homologar, cambiar ramas ni integrar durante la validación. Informar integración por separado del veredicto funcional.

---

## 4. Validar dependencias

Antes de evaluar la HU, verifica que sus dependencias necesarias estén disponibles.

Ejemplo:

```text
LIB-001 depende de:
- AUTH-001
- CAT-001
```

Si una dependencia necesaria no está implementada o no puede verificarse:

* indícalo;
* determina si realmente impide validar la HU;
* no marques la HU como Done si depende funcionalmente de algo inexistente.

---

## 5. Evaluar criterios de aceptación

Evalúa cada criterio individualmente.

Usa uno de estos estados:

```text
PASS
FAIL
PARTIAL
NOT_VERIFIED
NOT_APPLICABLE
```

Significado:

### PASS

Existe evidencia suficiente de que el criterio se cumple.

### FAIL

Existe evidencia de que el criterio no se cumple.

### PARTIAL

Existe implementación, pero falta una parte necesaria.

### NOT_VERIFIED

No fue posible demostrar el criterio con el código, tests o ejecución disponible.

### NOT_APPLICABLE

El criterio dejó de aplicar debido a una decisión formal del proyecto.

Usar `NOT_APPLICABLE` solo si existe evidencia clara de esa decisión.

No utilizarlo para evitar implementar un criterio.

---

## 6. Buscar evidencia

Cada resultado debe basarse en evidencia concreta.

### Evidencia mínima según el criterio

- **Build:** comando ejecutado y salida/código de éxito. No demuestra por sí solo arranque del servidor ni comportamiento en navegador.
- **Arranque:** iniciar con la configuración documentada y comprobar disponibilidad/respuesta. Detener únicamente el proceso iniciado para la verificación. Si no se ejecutó, usar `NOT_VERIFIED`.
- **Endpoint HTTP:** prueba e2e o petición real que compruebe ruta, status, cuerpo y acceso con/sin autenticación según el criterio. Invocar un controller directamente no prueba registro de rutas ni guards.
- **Lint/tests:** registrar comando y resultado. Que exista el script o la configuración no significa que pase; Prettier comprueba formato y no sustituye lint.
- **Versiones:** comprobar lockfile y versión instalada cuando el criterio fija una versión. Un rango como `^21.2.0` no demuestra `21.2.6`; informar discrepancias sin cambiar el criterio automáticamente.
- **Entorno:** verificar carga efectiva de `.env`, precedencia de variables y rechazo de entradas ausentes/inválidas conforme a la documentación. `.env.example` por sí solo no carga variables. Verificar archivos ignorados con `git check-ignore` y posibles archivos sensibles ya tracked sin mostrar sus valores.
- Reutilizar verificaciones previas solo si el código y configuración relevantes siguen iguales, indicando su alcance. No declarar ausencia de secretos o errores de consola sin haberlo comprobado; usar `NOT_VERIFIED` o `NOT_APPLICABLE` con motivo.

La evidencia puede ser:

* implementación en código;
* test unitario;
* test de integración;
* test e2e;
* resultado de build;
* comportamiento ejecutado localmente;
* configuración;
* migración;
* contrato HTTP;
* validación;
* documentación cuando el criterio sea documental.

Ejemplo:

```text
Criterio:
GET /api/v1/health responde HTTP 200.

Resultado:
PASS

Evidencia:
- apps/api/src/health/health.controller.ts
- prueba e2e ejecutada contra GET /api/v1/health sin credenciales
- respuesta HTTP 200 y cuerpo con status reconocible
```

Evita argumentos vagos como:

```text
"parece estar implementado"
```

---

## 7. Ejecutar verificaciones

Ejecuta los checks relevantes según la aplicación afectada.

### Frontend

Desde:

```text
apps/web
```

Considera:

```bash
npm test
npm run build
```

Si existe un script de lint no destructivo, úsalo.

No inventes scripts.

### Backend

Desde:

```text
apps/api
```

Considera:

```bash
npm test
npm run test:e2e
npm run build
```

Usa `npm run lint` con precaución porque puede modificar archivos.

Antes de ejecutarlo, recuerda que ESLint está configurado con `--fix`.

No lo ejecutes como una comprobación de solo lectura sin considerar ese efecto.

Para comprobar lint sin autofix, si la configuración actual sigue siendo ESLint, puede ejecutarse desde `apps/api`: `npx --no-install eslint "{src,apps,libs,test}/**/*.ts"`. Registrar el resultado real. Si no se puede verificar, no asignar `PASS`.

---

## 8. Definition of Done

Además de los criterios de aceptación, verifica la Definition of Done definida en `AGENTS.md`.

Como mínimo:

* criterios de aceptación cumplidos;
* proyecto compila;
* tests relevantes pasan;
* errores importantes están manejados;
* autorización considerada si aplica;
* no existen secretos versionados;
* documentación actualizada si corresponde;
* no hay errores importantes conocidos en consola;
* no quedan cambios obviamente temporales.

---

## 9. Seguridad

Cuando corresponda, verifica explícitamente:

* autorización server-side;
* aislamiento entre usuarios;
* validación de inputs;
* ausencia de secretos en frontend;
* ausencia de secretos en Git;
* manejo seguro de errores;
* no confiar en identificadores de usuario enviados por el cliente.

Los problemas de seguridad relevantes impiden marcar la HU como Done.

---

## 10. Casos borde

No es necesario inventar decenas de edge cases.

Revisa solamente los que puedan romper el requerimiento.

Ejemplos:

```text
lista vacía
registro duplicado
recurso inexistente
usuario no autenticado
usuario intentando modificar datos ajenos
API externa caída
datos opcionales ausentes
```

---

## 11. Resultado de validación

Entrega una tabla o sección equivalente:

```text
HU: LIB-001 — Agregar un videojuego a mi biblioteca

Criterios:

1. Agregar desde resultado o detalle
   PASS
   Evidencia: ...

2. Estado inicial definido
   PASS
   Evidencia: ...

3. Evitar duplicados
   FAIL
   Evidencia: no existe validación ...

4. Feedback visual
   PARTIAL
   Evidencia: ...
```

Después:

```text
Definition of Done

Build: PASS
Tests: PASS
Lint: NOT_VERIFIED
Seguridad: PASS
Documentación: PASS
```

---

## 12. Veredicto

Usa exactamente uno de estos resultados:

```text
READY_FOR_DONE
NOT_READY
BLOCKED
```

### READY_FOR_DONE

Usar solo cuando:

* todos los criterios necesarios están `PASS`;
* no existen fallos relevantes en Definition of Done;
* no hay blockers activos.

La HU puede pasar a:

```text
Done
```

### NOT_READY

Usar cuando existe trabajo pendiente que puede resolverse normalmente.

Ejemplos:

* criterio incompleto;
* test faltante;
* error funcional;
* validación faltante.

La HU debe mantenerse:

```text
In Progress
```

o:

```text
Review
```

según el estado real.

### BLOCKED

Usar cuando la validación no puede completarse por una dependencia o impedimento externo concreto.

La HU puede pasar a:

```text
Blocked
```

---

## 13. Trabajo pendiente

Si el resultado es `NOT_READY`, genera una lista mínima de acciones necesarias.

Ejemplo:

```text
Pendiente para completar LIB-001:

1. Implementar restricción de duplicados por usuario + externalGameId.
2. Agregar test del caso duplicado.
3. Mostrar confirmación visual al agregar un juego.
```

No agregues mejoras opcionales.

Solo lo necesario para cumplir la HU.

---

## 14. Actualización del backlog

Por defecto:

* NO cambies automáticamente la HU a `Done`;
* entrega primero el resultado de validación.

Una petición genérica de continuar o corregir un archivo no autoriza cerrar otras HUs ni crear commits. Si se autoriza actualizar estados, mantener coherentes `BACKLOG_GAMER.md` y `PROJECT_STATE.md`, con evidencia y pendientes; no convertir una validación local en una afirmación de merge/publicación.

Si el usuario pidió explícitamente validar y actualizar estado:

### Si READY_FOR_DONE

Actualiza:

```text
Estado: Done
```

en `BACKLOG_GAMER.md`.

### Si NOT_READY

Mantén:

```text
In Progress
```

o:

```text
Review
```

según corresponda.

### Si BLOCKED

Actualiza a:

```text
Blocked
```

solo si el blocker es real y está confirmado.

---

## 15. PROJECT_STATE.md

Si la validación provoca un cambio de estado relevante y el usuario pidió actualizar documentación:

actualiza `PROJECT_STATE.md`.

Debe reflejar:

* estado final de la HU;
* trabajo pendiente;
* blocker si existe;
* siguiente paso recomendado.

No agregues detalles históricos extensos.

---

## 16. Relación con code-review

`validate-hu` y `code-review` tienen objetivos distintos.

### code-review

Pregunta:

```text
¿El código tiene problemas?
```

Busca:

* bugs;
* seguridad;
* mantenibilidad;
* tests;
* problemas técnicos.

### validate-hu

Pregunta:

```text
¿La Historia de Usuario cumple lo prometido?
```

Busca:

* criterios de aceptación;
* Definition of Done;
* comportamiento funcional;
* evidencia.

Puede utilizar resultados de una revisión de código previa, pero no depende obligatoriamente de ella.

---

## 17. Salida final recomendada

Utiliza un formato compacto:

```text
Validación HU: LIB-001

Resultado: NOT_READY

Criterios:
- PASS — Agregar juego
- PASS — Estado inicial
- FAIL — Evitar duplicados
- PASS — Feedback visual

Definition of Done:
- Build: PASS
- Tests: PASS
- Seguridad: PASS
- Documentación: PASS

Pendiente:
1. Evitar duplicados por usuario y juego externo.
2. Agregar test del caso duplicado.

Estado recomendado:
In Progress
```

---

## Restricciones

* No inventar evidencia.
* No asumir que "compila" significa que cumple la HU.
* No marcar `Done` con criterios `FAIL`, `PARTIAL` o `NOT_VERIFIED` relevantes.
* No modificar criterios de aceptación para hacer pasar la validación.
* No agregar mejoras fuera de alcance como condición para cerrar la HU.
* No hacer commits automáticamente.
* No modificar código salvo que el usuario también solicite corregir los problemas encontrados.
