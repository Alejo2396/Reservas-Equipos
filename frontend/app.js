const API = 'http://localhost:3000/api';

if (location.pathname.includes('dashboard')) {
  const u = localStorage.getItem('usuario');
  if (!u) {
    alert('Debes iniciar sesión');
    location.href = 'login.html';
  }
}

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

function cerrarSesion() {
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
}
