CREATE DATABASE IF NOT EXISTS reservas_equipos;
USE reservas_equipos;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100),
  correo VARCHAR(100),
  password VARCHAR(100)
);

CREATE TABLE equipos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50)
);

CREATE TABLE reservas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  equipo_id INT,
  fecha DATE
);

INSERT INTO equipos (nombre) VALUES
('PC-01'),('PC-02'),('PC-03'),('Laptop-01');
