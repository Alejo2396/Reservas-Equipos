const API = 'http://localhost:3000/api';

/* =========================
   PROTEGER DASHBOARD
========================= */
if (location.pathname.includes('dashboard')) {
  const u = localStorage.getItem('usuario');
  if (!u) {
    alert('Debes iniciar sesión');
    location.href = 'login.html';
  }
}

/* =========================
   REGISTRO
========================= */
function registrar() {
  fetch(API + '/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: nombre.value,
      correo: correo.value,
      password: password.value
    })
  })
  .then(() => location.href = 'login.html');
}

/* =========================
   LOGIN (CORREGIDO)
========================= */
function login() {
  fetch(API + '/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      correo: correo.value,
      password: password.value
    })
  })
  .then(r => {
    if (!r.ok) {
      alert('Correo o contraseña incorrectos');
      throw new Error('Login inválido');
    }
    return r.json();
  })
  .then(u => {
    localStorage.setItem('usuario', JSON.stringify(u));
    location.href = 'dashboard.html';
  })
  .catch(() => {});
}

/* =========================
   CARGAR EQUIPOS
========================= */
function cargarEquipos() {
  fetch(API + '/equipos/' + fecha.value)
    .then(r => r.json())
    .then(data => {
      equipo.innerHTML = '';
      data.forEach(e => {
        equipo.innerHTML += `<option value="${e.id}">${e.nombre}</option>`;
      });
    });
}

/* =========================
   RESERVAR EQUIPO
========================= */
function reservar() {
  const u = JSON.parse(localStorage.getItem('usuario'));

  if (!u || !u.id) {
    alert('Sesión inválida');
    return;
  }

  fetch(API + '/reservar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuario_id: u.id,
      equipo_id: equipo.value,
      fecha: fecha.value
    })
  })
  .then(() => alert('Reserva creada correctamente'));
}

/* =========================
   VER MIS RESERVAS
========================= */
function verReservas() {
  const u = JSON.parse(localStorage.getItem('usuario'));

  fetch(API + '/mis-reservas/' + u.id)
    .then(r => r.json())
    .then(data => {
      lista.innerHTML = '';

      if (data.length === 0) {
        lista.innerHTML = '<li>No hay reservas</li>';
        return;
      }

      data.forEach(r => {
        lista.innerHTML += `<li>${r.nombre} - ${r.fecha}</li>`;
      });
    });
}

/* =========================
   CERRAR SESIÓN
========================= */
function cerrarSesion() {
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
}
