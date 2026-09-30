const express = require('express');
const { ErrorNegocio, PRIORIDADES, TRANSICIONES } = require('./servicios');

// Mensajes de confirmación que se muestran tras redirigir (?ok=...)
const MENSAJES_OK = {
  creado: 'Solicitud registrada correctamente.',
  asignado: 'Responsable asignado.',
  estado: 'Estado actualizado.',
};

function crearRutas(repo, servicios) {
  const router = express.Router();

  function mensajeOk(req) {
    return MENSAJES_OK[req.query.ok] || null;
  }

  function renderDetalle(res, ticket, { error = null, ok = null, status = 200 } = {}) {
    res.status(status).render('detalle', {
      titulo: ticket.codigo,
      ticket,
      historial: repo.historialDeTicket(ticket.id),
      tecnicos: repo.listarTecnicos(),
      usuarios: repo.listarUsuariosActivos(),
      estadosPermitidos: TRANSICIONES[ticket.estado],
      error,
      ok,
    });
  }

  function renderNuevo(res, { valores = {}, errores = {}, error = null, status = 200 } = {}) {
    res.status(status).render('nuevo', {
      titulo: 'Nueva solicitud',
      usuarios: repo.listarUsuariosActivos(),
      categorias: repo.listarCategorias(),
      prioridades: PRIORIDADES,
      valores: { prioridad: 'Media', ...valores },
      errores,
      error,
    });
  }

  // RF-03: listado
  router.get('/', (req, res) => {
    res.render('listado', {
      titulo: 'Solicitudes',
      tickets: repo.listarTickets(),
      ok: mensajeOk(req),
      codigo: req.query.codigo,
    });
  });

  // RF-01: formulario
  router.get('/tickets/nuevo', (req, res) => renderNuevo(res));

  // RF-01 + RF-02: guardar
  router.post('/tickets', (req, res) => {
    try {
      const ticket = servicios.registrarTicket(req.body);
      res.redirect(303, `/?ok=creado&codigo=${encodeURIComponent(ticket.codigo)}`);
    } catch (err) {
      if (!(err instanceof ErrorNegocio)) throw err;
      renderNuevo(res, { valores: req.body, errores: err.errores, error: err.message, status: 422 });
    }
  });

  // Detalle + historial
  router.get('/tickets/:id', (req, res) => {
    const ticket = servicios.buscarTicket(req.params.id);
    renderDetalle(res, ticket, { ok: mensajeOk(req) });
  });

  // RF-04: asignar responsable / cambiar estado
  function accionSobreTicket(accion, clave) {
    return (req, res) => {
      try {
        accion(req.params.id, req.body);
        res.redirect(303, `/tickets/${req.params.id}?ok=${clave}`);
      } catch (err) {
        if (!(err instanceof ErrorNegocio) || err.status === 404) throw err;
        renderDetalle(res, servicios.buscarTicket(req.params.id), { error: err.message, status: 422 });
      }
    };
  }

  router.post('/tickets/:id/asignar',
    accionSobreTicket((id, body) => servicios.asignarResponsable(id, body), 'asignado'));
  router.post('/tickets/:id/estado',
    accionSobreTicket((id, body) => servicios.cambiarEstado(id, body), 'estado'));

  return router;
}

module.exports = { crearRutas };
