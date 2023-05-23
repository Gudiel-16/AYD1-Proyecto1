let chai = require('chai');
let chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);
const url= 'http://all-for-one7.herokuapp.com';

describe('Login de usuario: ', () => {
    it('[Exitoso] Deberia obtener un JSON con la información del usuario', (done) => {
        const usuario = {
                            nombreUsuario: "usuarioTest", 
                            contrasenia: "Tester123" 
                        }; //Para error colocar contraseña incorrecta
        chai.request(url)
            .post('/login')
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('nombreusuario').eq(usuario.nombreUsuario);
                res.body.should.have.property('dpi');
                res.body.should.have.property('nombre');
                res.body.should.have.property('contrasenia');
                res.body.should.have.property('tipousuario_codigo');
                done();
            })
    });
    it('[Fallido] Deberia obtener la palabra false', (done) => {
        const usuario = {
                            nombreUsuario: "usuarioTest", 
                            contrasenia: "Tester123a"
                        }; //Para error colocar contraseña correcta
        chai.request(url)
            .post('/login')
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(500);
                res.text.should.be.eq('false');
                res.body.should.not.be.a('object');
                done();
            })
    });
});

describe('Actualizar estado de un reporte: ', () => {
    it('[Exitoso] Deberia obtener Reporte actualizado', (done) => {
        const reporte = {
                            nuevoEstado: "1", 
                            encargado: "usuarioEmpTester"
                        }; //error
        const idReporte = 1;
        chai.request(url)
            .put('/actualizarReporte/' + idReporte)
            .send(reporte)
            .end((err, res) =>{
                res.should.have.status(200); 
                res.text.should.be.eq('Reporte actualizado');
                done();
            })
    });
    it('[Fallido] Deberia obtener status 500', (done) => {
        const reporte = {
                            nuevoEstado: "1", 
                            encargado: "usuarioEmpTester"
                        };
        const idReporte = 1;
        chai.request(url)
            .put('/actualizarReporte/' + idReporte)
            .send(reporte)
            .end((err, res) =>{
                res.should.have.status(500); //Cambiar error a 200 
                res.text.should.not.be.eq('Reporte actualizado');
                done();
            })
    });
});

describe('Eliminar un reporte: ', () => {
    it('[Exitoso] Deberia obtener Usuario Actualizado', (done) => {
        //Error: idReporte admite números enteros - colocar reporte 1
        const idReporte = 'abc'; 
        chai.request(url)
            .delete('/eliminarReporte/' + idReporte)
            .end((err, res) =>{
                res.should.have.status(200);
                res.text.should.be.eq('Reporte Eliminado');
                done();
            })
    });
});

describe('Editar un usuario: ', () => {
    it('[Exitoso] Deberia obtener Usuario Actualizado', (done) => {
        const nombreUsuario = 'usuarioTest';
        const usuario = {
                            dpi: '124563588',
                            nombre: 'new name',
                            contrasenia: 'newpassword',
                            tipousuario_codigo: 'abc' //Error: tipousuario_codigo sólo admite números enteros - colocar tipo usuario 4 
                        };
        chai.request(url)
            .post('/editarUsuario/' + nombreUsuario)
            .send(usuario)
            .end((err, res) =>{
                res.should.have.status(200);
                res.text.should.be.eq('Usuario Actualizado');
                done();
            })
    });
});