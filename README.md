# Backlog Gamer

Aplicación web personal para gestionar un backlog de videojuegos.

## Estructura

```
backlog_gamer/
├── apps/
│   ├── web/        # Frontend Angular 21
│   └── api/        # Backend NestJS
└── docs/           # Documentación
```

## Requisitos

- Node.js 24.x
- npm 11.x

## Preparación

Clona el repositorio:

```bash
git clone <repo-url>
cd backlog_gamer
```

### Frontend

```bash
cd apps/web
npm install
npm start
```

Abre http://localhost:4200

### Backend

```bash
cd apps/api
npm install
npm run start:dev
```

La API escucha en http://localhost:3000

## Scripts

### Web

- `npm start` — servidor de desarrollo
- `npm run build` — build de producción
- `npm test` — tests unitarios

### API

- `npm run start:dev` — servidor en modo watch
- `npm run build` — compila a `dist/`
- `npm test` — tests unitarios
- `npm run test:e2e` — tests end-to-end
- `npm run lint` — ESLint (modifica archivos con `--fix`)
