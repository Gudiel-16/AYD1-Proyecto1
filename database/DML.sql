USE muni_mixco_quejas;

INSERT INTO tipousuario (codigo, nombre) VALUES (1, 'administrador');
INSERT INTO tipousuario (codigo, nombre) VALUES (2, 'empleado');
INSERT INTO tipousuario (codigo, nombre) VALUES (3, 'anonimo');
INSERT INTO tipousuario (codigo, nombre) VALUES (4, 'ciudadano');

INSERT INTO tiporeporte (codigo, nombre) VALUES (1, 'Baches de calles');
INSERT INTO tiporeporte (codigo, nombre) VALUES (2, 'Actos de delincuencia');
INSERT INTO tiporeporte (codigo, nombre) VALUES (3, 'Alumbrado publico');
INSERT INTO tiporeporte (codigo, nombre) VALUES (4, 'Falta de agua');

INSERT INTO usuario (nombreusuario, dpi, nombre, contrasenia, tipousuario_codigo) VALUES ('admin', '2222222222222','Administrador', 'admin123', 1);
INSERT INTO usuario (nombreusuario, dpi, nombre, contrasenia, tipousuario_codigo) VALUES ('anonimo', 'anonimo','anonimo', 'anonimo', 3);
INSERT INTO usuario (nombreusuario, dpi, nombre, contrasenia, tipousuario_codigo) VALUES ('usuarioTest', '1111111111111','usuario Tester', 'Tester123', 4);
INSERT INTO usuario (nombreusuario, dpi, nombre, contrasenia, tipousuario_codigo) VALUES ('usuarioEmpTester', '5555555555555','usuario Tester Empleado', 'Tester123', 2);

INSERT INTO reporte (tiporeporte_codigo, usuario_nombreusuario, fecha, hora, resuelto, encargado)
VALUES (1, 'usuarioTest', '2021-06-24','17:33:00',0, null);
insert into formulario(reporte_codigo, descripcion,zona) values (1,'Reporte para pruebas unitarias',1);

