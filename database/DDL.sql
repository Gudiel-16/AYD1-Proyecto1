/*
	Laboratorio AYD1 - Junio 2021
    Grupo 7
	CREACION DE BASE DE DATOS
*/
CREATE DATABASE muni_mixco_quejas;
USE muni_mixco_quejas;

CREATE TABLE tipousuario (
    codigo INT AUTO_INCREMENT,
    nombre VARCHAR(40) NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE usuario (
	nombreusuario 		VARCHAR(20) NOT NULL,
    dpi 				VARCHAR(13) NOT NULL,
    nombre 				VARCHAR(60) NOT NULL,
    contrasenia 		VARCHAR(30) NOT NULL,
    tipousuario_codigo 	INT NOT NULL,
    PRIMARY KEY (nombreusuario),
    FOREIGN KEY (tipousuario_codigo) 
    	REFERENCES tipousuario (codigo)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE tiporeporte (
    codigo INT AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (codigo)
);

CREATE TABLE reporte (
    codigo 					INT AUTO_INCREMENT,
    tiporeporte_codigo 		INT NOT NULL,
    usuario_nombreusuario	VARCHAR(20) NOT NULL,
    fecha 					DATE NOT NULL,
    hora 					TIME NOT NULL,
    resuelto 				CHAR(1) NOT NULL,
    encargado				VARCHAR(20) NULL,
    PRIMARY KEY 		(codigo),
    FOREIGN KEY 		(tiporeporte_codigo) 
    	REFERENCES 		tiporeporte (codigo)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE,
    FOREIGN KEY 		(usuario_nombreusuario) 
    	REFERENCES 		usuario (nombreusuario)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE formulario (
    codigo 			INT AUTO_INCREMENT,
    reporte_codigo 	INT NOT NULL,
    descripcion 	VARCHAR(450) NOT NULL,
    zona 			INT NOT NULL,
    PRIMARY KEY (codigo),
    FOREIGN KEY (reporte_codigo) 
    	REFERENCES reporte (codigo)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE archivo (
    codigo 				INT AUTO_INCREMENT,
    formulario_codigo 	INT NOT NULL,
    fotografia 			VARCHAR(22) NOT NULL,
    PRIMARY KEY (codigo),
    FOREIGN KEY (formulario_codigo) 
    	REFERENCES formulario (codigo)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);

CREATE TABLE mensaje (
    codigo 			INT AUTO_INCREMENT,
    fecha 			DATE NOT NULL,
    hora 			TIME NOT NULL,
    cuerpo 			VARCHAR(400) NOT NULL,
    reporte_codigo 	INT NOT NULL,
    leido			INT NOT NULL,
    PRIMARY KEY 	(codigo),
    FOREIGN KEY 	(reporte_codigo) 
    	REFERENCES 	reporte (codigo)
    	ON DELETE CASCADE
    	ON UPDATE CASCADE
);