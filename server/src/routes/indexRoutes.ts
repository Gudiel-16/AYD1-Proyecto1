import { Router } from 'express';

import {controllersLogin} from '../controllers/controllersLogin'
import {controllersUsuario} from '../controllers/controllersUsuario'
import {controllersReporte} from '../controllers/controllersReporte'
import {controllersMensaje} from '../controllers/controllersMensaje'

class IndexRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {

        //LOGIN
        this.router.post('/login', controllersLogin.loguear);

        //GESTION DE USUARIOS
        this.router.post('/registrarUsuario', controllersUsuario.registrar);
        this.router.post('/editarUsuario/:nombreUsuario', controllersUsuario.editar);
        this.router.delete('/eliminarUsuario/:nombreUsuario', controllersUsuario.eliminar);
        this.router.delete('/eliminarUsuario/:nombreUsuario', controllersUsuario.eliminar);
        this.router.delete('/eliminarUsuario/:nombreUsuario', controllersUsuario.eliminar);
        this.router.get('/obtenerUsuario/:nombreUsuario', controllersUsuario.obtenerUsuario);
        this.router.get('/obtenerUsuarios', controllersUsuario.obtenerUsuarios);

        //REPORTE
        this.router.post('/agregarReporte', controllersReporte.agregar);
        this.router.put('/actualizarReporte/:idReporte', controllersReporte.actualizarEstadoReporte);
        this.router.delete('/eliminarReporte/:idReporte', controllersReporte.eliminarReporte);
        this.router.get('/reportes', controllersReporte.verReportes);
        this.router.get('/reportesUsuario/:nombreUsuario', controllersReporte.verReportesUsuario);
        this.router.get('/fotos/:idReporte', controllersReporte.verArchivos);
        this.router.get('/mensajes/:nombreUsuario', controllersReporte.verMensajes);
        
        //MENSAJE
        this.router.put('/actualizarMensaje/:idMensaje', controllersMensaje.editarLeido);
    }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;