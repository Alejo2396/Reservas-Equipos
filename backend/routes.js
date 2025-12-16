const express = require('express');
const router = express.Router();
const db = require('./db');

router.post('/registro', (req, res) => {
  const { nombre, correo, password } = req.body;

  db.query(
    'INSERT INTO usuarios VALUES (NULL, ?, ?, ?)',
    [nombre, correo, password],
    (e) => {
      if (e) {
        console.error(e);
        return res.status(500).json({ error: 'Error al registrar' });
      }
      res.json({ ok: true });
    }
  );
});


router.post('/login', (req, res) => {
  const { correo, password } = req.body;

  console.log('BODY:', req.body); 

  db.query(
    'SELECT * FROM usuarios WHERE correo=? AND password=?',
    [correo, password],
    (e, r) => {

      if (e) {
        console.error('ERROR MYSQL:', e); 
        return res.status(500).json({ error: 'Error MySQL' });
      }

      if (!r || r.length === 0) {
        return res.status(401).json({ error: true });
      }

      res.json(r[0]);
    }
  );
});

router.get('/equipos/:fecha', (req, res) => {
  db.query(
    `SELECT * FROM equipos WHERE id NOT IN
     (SELECT equipo_id FROM reservas WHERE fecha=?)`,
    [req.params.fecha],
    (e, r) => {
      if (e) {
        console.error(e);
        return res.status(500).json({ error: true });
      }
      res.json(r);
    }
  );
});


router.post('/reservar', (req, res) => {
  const { usuario_id, equipo_id, fecha } = req.body;

  db.query(
    'INSERT INTO reservas VALUES (NULL, ?, ?, ?)',
    [usuario_id, equipo_id, fecha],
    (e) => {
      if (e) {
        console.error(e);
        return res.status(500).json({ error: true });
      }
      res.json({ ok: true });
    }
  );
});


router.get('/mis-reservas/:id', (req, res) => {
  db.query(
    `SELECT equipos.nombre, reservas.fecha
     FROM reservas
     JOIN equipos ON reservas.equipo_id = equipos.id
     WHERE reservas.usuario_id = ?`,
    [req.params.id],
    (e, r) => {
      if (e) {
        console.error(e);
        return res.status(500).json({ error: true });
      }
      res.json(r);
    }
  );
});

module.exports = router;
