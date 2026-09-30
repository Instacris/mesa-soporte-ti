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
- Estado actual: **H2 – Línea base v1.0** (30-09)

## Tecnología

| Capa | Tecnología |
|---|---|
| Presentación | HTML + CSS + plantillas EJS |
| Lógica | Node.js 24 + Express 5 |
| Datos | SQLite (módulo `node:sqlite` incluido en Node) |
| Pruebas | `node:test` |
| Versionado y tablero | Git + GitHub + GitHub Projects |

Justificación en [docs/02_H2_linea_base.md](docs/02_H2_linea_base.md#8-arquitectura-preliminar).

## Documentación

- [H1 – Inicio y planificación](docs/01_H1_inicio.md)
- [H2 – Línea base (planificación v1.0)](docs/02_H2_linea_base.md)
- [Backlog](docs/backlog.csv)
- [Wireframes](docs/wireframes.html)
- Base de datos: [schema.sql](db/schema.sql) · [seed.sql](db/seed.sql)
