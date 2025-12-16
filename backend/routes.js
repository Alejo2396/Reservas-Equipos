const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/registro', (req, res) => {
  const { nombre, correo, password } = req.body;

  db.query(
    'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)',
    [nombre, correo, password],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensaje: 'Error al registrar' });
      }
      res.json({ mensaje: 'Usuario registrado correctamente' });
    }
  );
});

router.post('/login', (req, res) => {
  const { correo, password } = req.body;

  db.query(
    'SELECT * FROM usuarios WHERE correo=? AND password=?',
    [correo, password],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error MySQL' });
      }

      if (rows.length === 0) {
        return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
      }

      res.json({ usuario: rows[0] });
    }
  );
});


router.get('/equipos', (req, res) => {
  const { fecha } = req.query;

  db.query(
    `SELECT * FROM equipos 
     WHERE id NOT IN (
       SELECT equipo_id FROM reservas WHERE fecha = ?
     )`,
    [fecha],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al cargar equipos' });
      }
      res.json(rows);
    }
  );
});

router.post('/reservas', (req, res) => {
  const { usuario_id, equipo_id, fecha } = req.body;

  db.query(
    'INSERT INTO reservas (usuario_id, equipo_id, fecha) VALUES (?, ?, ?)',
    [usuario_id, equipo_id, fecha],
    (err) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al reservar' });
      }
      res.json({ mensaje: 'Reserva realizada correctamente' });
    }
  );
});

router.get('/reservas/:id', (req, res) => {
  db.query(
    `SELECT e.nombre AS equipo, r.fecha
     FROM reservas r
     JOIN equipos e ON r.equipo_id = e.id
     WHERE r.usuario_id = ?`,
    [req.params.id],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ mensaje: 'Error al obtener reservas' });
      }
      res.json(rows);
    }
  );
});

module.exports = router;
