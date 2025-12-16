const API = "http://localhost:3000";

async function registrar() {
    const nombre = document.getElementById("nombre")?.value;
    const correo = document.getElementById("correo")?.value;
    const password = document.getElementById("password")?.value;

    if (!nombre || !correo || !password) {
        alert("Todos los campos son obligatorios");
        return;
    }

    const res = await fetch(`${API}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, password })
    });

    const data = await res.json();
    alert(data.mensaje);

    if (res.ok) {
        window.location.href = "login.html";
    }
}

async function login() {
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })
    });

    const data = await res.json();

    if (!res.ok) {
        alert(data.mensaje);
        return;
    }

    localStorage.setItem("usuario", JSON.stringify(data.usuario));
    window.location.href = "dashboard.html";
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
}

async function cargarEquipos() {
    const fecha = document.getElementById("fecha").value;
    const select = document.getElementById("equipo");

    select.innerHTML = "";

    const res = await fetch(`${API}/equipos?fecha=${fecha}`);
    const data = await res.json();

    data.forEach(e => {
        const option = document.createElement("option");
        option.value = e.id;
        option.textContent = e.nombre;
        select.appendChild(option);
    });
}

async function reservar() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const equipoId = document.getElementById("equipo").value;
    const fecha = document.getElementById("fecha").value;

    const res = await fetch(`${API}/reservas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            usuario_id: usuario.id,
            equipo_id: equipoId,
            fecha
        })
    });

    const data = await res.json();
    alert(data.mensaje);
}

async function verReservas() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    const res = await fetch(`${API}/reservas/${usuario.id}`);
    const data = await res.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    data.forEach(r => {
        const li = document.createElement("li");
        li.textContent = `${r.equipo} - ${r.fecha}`;
        lista.appendChild(li);
    });
}
