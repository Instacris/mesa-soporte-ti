# Mesa de Soporte TI

Sistema web liviano para registrar y controlar solicitudes de soporte TI (tickets) desde su registro
hasta su cierre, con trazabilidad de responsable, prioridad, estado y tiempos de atención.

Proyecto de la Evaluación 3 – Mesa de Soporte TI.

## Equipo

| Integrante | Usuario GitHub |
|---|---|
| Cristóbal Chacón | @[usuario] |
| Milton [Apellido] | @[usuario] |

- Tablero del proyecto: [enlace a GitHub Projects]
- Estado actual: **MVP v0.1** — RF-01 a RF-04 implementados (registro, código único, listado, asignación y estados).
  Pendientes: RF-05 (filtros) y RF-06 (resumen).

## Cómo ejecutar

Requisito: **Node.js 22.13 o superior** (probado con Node 24). No hace falta instalar ninguna base de datos.

```bash
npm install
npm start
```

Abrir <http://localhost:3000>. La primera vez se crea `db/mesa.db` automáticamente con los datos de prueba.

| Comando | Qué hace |
|---|---|
| `npm start` | Inicia la aplicación en el puerto 3000 (cambiar con la variable `PORT`) |
| `npm run dev` | Igual, pero se reinicia sola al guardar cambios |
| `npm test` | Ejecuta las pruebas funcionales automatizadas |
| `npm run db:reset` | Borra y recrea la BD con los datos de prueba (con la app detenida) |

## Tecnología

| Capa | Tecnología |
|---|---|
| Presentación | HTML + CSS + plantillas EJS |
| Lógica | Node.js + Express 5 |
| Datos | SQLite (módulo `node:sqlite` incluido en Node) |
| Pruebas | `node:test` |
| Versionado y tablero | Git + GitHub + GitHub Projects |

Justificación en [docs/02_H2_linea_base.md](docs/02_H2_linea_base.md#8-arquitectura-preliminar).

## Estructura

```
src/
├── server.js        # arranque
├── app.js           # configuración Express y manejo de errores
├── rutas.js         # endpoints (capa de presentación)
├── servicios.js     # validaciones y reglas del flujo de estados (capa de lógica)
├── repositorio.js   # consultas SQL (capa de datos)
└── db.js            # conexión y creación de la BD
views/               # plantillas EJS
public/estilos.css
db/schema.sql        # creación de tablas, trigger del código TKT y vista de resumen
db/seed.sql          # datos de prueba
test/                # pruebas automatizadas
docs/                # planificación, wireframes, pruebas y evidencias
```

## Documentación

- [H1 – Inicio y planificación](docs/01_H1_inicio.md)
- [H2 – Línea base (planificación v1.0)](docs/02_H2_linea_base.md)
- [Pruebas y defectos](docs/pruebas.md)
- [Backlog](docs/backlog.csv)
- [Wireframes](docs/wireframes.html)
