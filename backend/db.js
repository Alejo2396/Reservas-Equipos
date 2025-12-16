const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', // ← OBLIGATORIO
  database: 'reservas_equipos'
});

db.connect(err => {
  if (err) {
    console.error('Error MySQL:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

module.exports = db;
