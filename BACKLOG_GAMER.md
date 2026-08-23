# Backlog Gamer

## Convenciones

### Tipos
- HU: Historia de Usuario.
- Enabler: trabajo técnico habilitante.

### Prioridad
- Must
- Should
- Could

### Estados
- Backlog
- Ready
- In Progress
- Review
- Blocked
- Done

---

# Sprint 0

## EN-001 — Inicializar repositorio y estructura base

**Tipo:** Enabler  
**Epic:** Foundation  
**Prioridad:** Must  
**Story Points:** 2  
**Estado:** Ready  
**Dependencias:** Ninguna

### Descripción
Como desarrollador, quiero una estructura de repositorio clara para separar frontend, backend y documentación.

### Criterios de aceptación
- Existe repositorio Git.
- Existen `apps/web`, `apps/api` y `docs`.
- Existe `.gitignore`.
- Existe `README.md`.
- El proyecto puede prepararse siguiendo el README.

---

## EN-002 — Crear aplicación web Angular

**Tipo:** Enabler  
**Epic:** Foundation  
**Prioridad:** Must  
**Story Points:** 2  
**Estado:** Ready  
**Dependencias:** EN-001

### Descripción
Como desarrollador, quiero disponer de la aplicación Angular base para comenzar a implementar la interfaz.

### Criterios de aceptación
- Angular 21.2.6.
- Routing habilitado.
- SCSS.
- TypeScript strict.
- La aplicación levanta sin errores.
- Los tests base pasan.

---

## EN-003 — Crear API base con NestJS

**Tipo:** Enabler  
**Epic:** Foundation  
**Prioridad:** Must  
**Story Points:** 2  
**Estado:** Ready  
**Dependencias:** EN-001

### Descripción
Como desarrollador, quiero una API Node.js estructurada para implementar la lógica de negocio y exponer servicios REST.

### Criterios de aceptación
- Proyecto NestJS creado.
- TypeScript strict.
- API levanta sin errores.
- Existe estructura inicial de módulos.
- Lint y tests base pasan.

---

## EN-004 — Configurar variables de entorno y secretos

**Tipo:** Enabler  
**Epic:** Foundation  
**Prioridad:** Must  
**Story Points:** 2  
**Estado:** Backlog  
**Dependencias:** EN-003

### Criterios de aceptación
- Existe `.env.example` sin secretos.
- `.env` está ignorado por Git.
- La API valida variables obligatorias al iniciar.
- README documenta las variables necesarias.

---

## EN-005 — Definir scripts de calidad y ejecución

**Tipo:** Enabler  
**Epic:** Foundation  
**Prioridad:** Must  
**Story Points:** 2  
**Estado:** Backlog  
**Dependencias:** EN-002, EN-003

### Criterios de aceptación
- Scripts documentados para web y API.
- Se puede ejecutar lint y test por aplicación.
- Se puede compilar web y API.
- Los scripts tienen nombres consistentes.

---

## EN-006 — Exponer health check de la API

**Tipo:** Enabler  
**Epic:** Foundation  
**Prioridad:** Must  
**Story Points:** 1  
**Estado:** Backlog  
**Dependencias:** EN-003

### Criterios de aceptación
- `GET /api/v1/health` responde 200.
- Respuesta contiene un estado reconocible.
- No requiere autenticación.
- Existe al menos un test automatizado.

---

# MVP

## AUTH-001 — Autenticarme en la aplicación

**Tipo:** HU  
**Epic:** Auth  
**Prioridad:** Must  
**Story Points:** 5  
**Estado:** Backlog  
**Dependencias:** EN-004

### Historia
Como jugador, quiero iniciar sesión de forma segura para acceder a mi biblioteca personal desde distintos dispositivos.

### Criterios de aceptación
- Existe un mecanismo de autenticación definido para el MVP.
- Credenciales inválidas muestran mensaje entendible.
- Una sesión válida habilita rutas privadas.
- Un usuario no autenticado no puede consultar una biblioteca privada.

---

## CAT-001 — Buscar videojuegos en un catálogo

**Tipo:** HU  
**Epic:** Game Catalog  
**Prioridad:** Must  
**Story Points:** 5  
**Estado:** Backlog  
**Dependencias:** EN-002, EN-003

### Historia
Como jugador, quiero buscar videojuegos por nombre para encontrarlos sin ingresar manualmente toda su información.

### Criterios de aceptación
- Búsqueda por texto.
- Resultados muestran título, portada y año cuando existan.
- Estado vacío sin resultados.
- Fallos del proveedor externo no rompen la aplicación.

---

## CAT-002 — Ver información básica de un videojuego

**Tipo:** HU  
**Epic:** Game Catalog  
**Prioridad:** Should  
**Story Points:** 3  
**Estado:** Backlog  
**Dependencias:** CAT-001

### Historia
Como jugador, quiero revisar información básica de un videojuego antes de agregarlo a mi biblioteca.

### Criterios de aceptación
- Título y portada.
- Plataformas y fecha de lanzamiento cuando existan.
- Descripción resumida cuando exista.
- Datos opcionales ausentes no rompen la vista.

---

## LIB-001 — Agregar un videojuego a mi biblioteca

**Tipo:** HU  
**Epic:** Library  
**Prioridad:** Must  
**Story Points:** 5  
**Estado:** Backlog  
**Dependencias:** AUTH-001, CAT-001

### Historia
Como jugador, quiero agregar un videojuego del catálogo a mi biblioteca para comenzar a hacer seguimiento de mi backlog.

### Criterios de aceptación
- Se puede agregar desde resultado o detalle.
- Se crea con estado inicial definido.
- No se permite duplicar el mismo juego para el mismo usuario.
- La operación entrega feedback visual.

---

## LIB-002 — Ver mi biblioteca de videojuegos

**Tipo:** HU  
**Epic:** Library  
**Prioridad:** Must  
**Story Points:** 5  
**Estado:** Backlog  
**Dependencias:** LIB-001

### Criterios de aceptación
- Solo aparecen juegos del usuario autenticado.
- Cada juego muestra título, portada y estado.
- Existe estado vacío.
- Funciona razonablemente en escritorio y móvil.

---

## LIB-003 — Cambiar el estado de un videojuego

**Tipo:** HU  
**Epic:** Library  
**Prioridad:** Must  
**Story Points:** 3  
**Estado:** Backlog  
**Dependencias:** LIB-002

### Criterios de aceptación
- Estados definidos por el dominio.
- Cambio persistente.
- UI refleja el cambio sin recarga manual.
- No se puede modificar un juego de otro usuario.

---

## LIB-004 — Registrar información personal de un videojuego

**Tipo:** HU  
**Epic:** Library  
**Prioridad:** Should  
**Story Points:** 5  
**Estado:** Backlog  
**Dependencias:** LIB-002

### Criterios de aceptación
- Plataforma jugada.
- Fechas de inicio y término opcionales.
- Nota personal.
- Valoración personal dentro de rango definido.
- Datos persistentes.

---

## LIB-005 — Eliminar un videojuego de mi biblioteca

**Tipo:** HU  
**Epic:** Library  
**Prioridad:** Should  
**Story Points:** 2  
**Estado:** Backlog  
**Dependencias:** LIB-002

### Criterios de aceptación
- Solicita confirmación.
- Confirmar elimina de la biblioteca.
- Cancelar no cambia nada.
- No se puede eliminar un registro ajeno.

---

## LIB-006 — Buscar, filtrar y ordenar mi biblioteca

**Tipo:** HU  
**Epic:** Library  
**Prioridad:** Should  
**Story Points:** 5  
**Estado:** Backlog  
**Dependencias:** LIB-002

### Criterios de aceptación
- Buscar por título.
- Filtrar por estado.
- Ordenar al menos por título y fecha de agregado.
- Combinar filtros.
- Limpiar filtros.

---

## DASH-001 — Ver un resumen de mi backlog

**Tipo:** HU  
**Epic:** Dashboard  
**Prioridad:** Should  
**Story Points:** 3  
**Estado:** Backlog  
**Dependencias:** LIB-002, LIB-003

### Criterios de aceptación
- Total de juegos.
- Cantidad por estado.
- Solo datos del usuario autenticado.
- Manejo correcto de biblioteca vacía.

---

## UX-001 — Recibir estados claros de carga, vacío y error

**Tipo:** HU  
**Epic:** UX  
**Prioridad:** Must  
**Story Points:** 3  
**Estado:** Backlog  
**Dependencias:** CAT-001, LIB-002

### Criterios de aceptación
- Loading en operaciones relevantes.
- Empty states útiles.
- Errores recuperables con mensajes entendibles.
- No mostrar errores técnicos sensibles.

---

# Post-MVP

## TAG-001 — Organizar videojuegos con etiquetas personales
**Prioridad:** Could  
**Story Points:** 5  
**Estado:** Backlog

## QUEUE-001 — Priorizar qué videojuegos quiero jugar después
**Prioridad:** Could  
**Story Points:** 5  
**Estado:** Backlog

## STAT-001 — Consultar estadísticas personales
**Prioridad:** Could  
**Story Points:** 8  
**Estado:** Backlog
