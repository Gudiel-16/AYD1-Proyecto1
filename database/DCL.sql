/*
	Laboratorio AYD1 - Junio 2021
    Grupo 7
	CREACION DE USUARIO PARA MANEJO ESTANDARIZADO DE BASE DE DATOS
*/

USE mysql;
CREATE USER 'allforone'@'localhost'
IDENTIFIED BY 'afo7';
GRANT ALL PRIVILEGES ON * . * TO 'allforone'@'localhost';
FLUSH PRIVILEGES;
ALTER USER 'allforone'@'localhost' IDENTIFIED WITH mysql_native_password BY 'afo7';