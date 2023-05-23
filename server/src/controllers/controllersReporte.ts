import { Request, Response } from 'express';

import pool from '../database';

class ControllerRerporte{

    public async agregar(req:Request,res:Response){

        try {
            const {tiporeporte_codigo, usuario_nombreusuario, fecha, hora, resuelto, encargado,
            descripcion, zona,
            fotografia} = req.body;
            //console.log(fotografia);

            let cantidadFotos = Object.keys(fotografia).length;

            //guardando reporte
            await pool.query('INSERT INTO reporte(tiporeporte_codigo,usuario_nombreusuario,fecha,hora,resuelto,encargado) values(?,?,?,?,?,?)',[tiporeporte_codigo, usuario_nombreusuario, fecha, hora, resuelto, encargado]);
            
            //obtengo id de reporte
            let result = await pool.query('select codigo from reporte order by codigo desc limit 1;');
            let codigoReporte =result[0]["codigo"];
    
            //guardando formulario
            await pool.query('INSERT INTO formulario(reporte_codigo,descripcion,zona) values(?,?,?)',[codigoReporte, descripcion, zona]);
    
            //obtengo id de formulario
            let result2 = await pool.query('select codigo from formulario order by codigo desc limit 1;');
            let codigoFormulario =result2[0]["codigo"];
    
            //recorriendo e insertando fotografias        
            if (cantidadFotos>=1){
                for (const key in fotografia) {
                    let fotoActual=Object.values(fotografia[key]);
                    await pool.query('INSERT INTO archivo(formulario_codigo,fotografia) values(?,?)',[codigoFormulario, fotoActual[0]]);
                    //console.log(fotoActual[0]);
                }
            }
            res.status(200).send('reporte guardado');
        } catch (error) {
            res.status(500).send('Error'); //da error cuando no viene "fotografia": { } 
        }        
    }

    public async actualizarEstadoReporte(req:Request,res:Response){
        
        const {idReporte} = req.params;
        const {nuevoEstado,encargado} = req.body;

        if(nuevoEstado==1){
            let result = await pool.query('select * from reporte where resuelto = 1 and codigo = ?',[idReporte]);
            if(result.length>0){
                res.status(500).send('Reporte en Resolucion');
            }else{
                await pool.query('UPDATE reporte set resuelto = ?, encargado = ? WHERE codigo = ?',[nuevoEstado, encargado, idReporte]);
                res.status(200).send('Reporte actualizado');
            }
        }else if(nuevoEstado==2){
            let result = await pool.query('select * from reporte where resuelto = 2 and codigo = ?',[idReporte]);
            if(result.length>0){
                res.status(500).send('Reporte Ya Resuelto');
            }else{
                const fecha = new Date();
                const anioActual = fecha.getFullYear();
                const mesActual = fecha.getMonth() + 1;
                const hoy = fecha.getDate();
                const fechaActual = anioActual+"/"+mesActual+"/"+hoy;
                const hora= fecha.getHours();
                const minutos= fecha.getMinutes();
                const horaActual = hora+":"+minutos;

                const cuerpo = "El problema reportado ha sido resuelto!";
                
                await pool.query('UPDATE reporte set resuelto = ? WHERE codigo = ?',[nuevoEstado, idReporte]);
                await pool.query('INSERT INTO mensaje(fecha,hora,cuerpo,reporte_codigo,leido) values(?,?,?,?,?)',[fechaActual,horaActual,cuerpo,idReporte,0]);

                res.status(200).send('Reporte actualizado');
            }
        }
    }

    public async eliminarReporte(req:Request,res:Response){
        try {
            const {idReporte} = req.params;
            await pool.query('DELETE FROM reporte WHERE codigo = ?',[idReporte]);
            res.status(200).send('Reporte Eliminado');
        } catch (error) {
            res.status(500).send('Error'); //da error si se le manda una letra, en vez del idReporte
        }
    }

    public async verReportes(req: Request, res: Response) {
        await pool.query(`SELECT
                            reporte.codigo,
                            reporte.tiporeporte_codigo,
                            reporte.usuario_nombreusuario,
                            DATE_FORMAT(reporte.fecha, "%d/%m/%Y") as fecha,
                            TIME_FORMAT(reporte.hora, "%H:%i") as hora,
                            reporte.encargado,
                            reporte.resuelto,
                            formulario.codigo AS codigo_formulario,
                            formulario.descripcion,
                            formulario.zona
                            FROM reporte
                            INNER JOIN formulario ON formulario.reporte_codigo = reporte.codigo;`, (err: any, rows: any, fields: any) => {
            if (!err) {
                res.status(200).json({ reportes: rows });
            } else {
                res.status(500).json({ error: 'Error' });
            }
        });
    }

    public async verReportesUsuario(req: Request, res: Response) {
        const {nombreUsuario} = req.params;
        await pool.query(`SELECT
                            reporte.codigo,
                            reporte.tiporeporte_codigo,
                            reporte.usuario_nombreusuario,
                            DATE_FORMAT(reporte.fecha, "%d/%m/%Y") as fecha,
                            TIME_FORMAT(reporte.hora, "%H:%i") as hora,
                            reporte.encargado,
                            reporte.resuelto,
                            formulario.codigo AS codigo_formulario,
                            formulario.descripcion,
                            formulario.zona
                            FROM reporte
                            INNER JOIN formulario ON formulario.reporte_codigo = reporte.codigo
                            AND reporte.usuario_nombreusuario = '${[nombreUsuario]}';`, (err: any, rows: any, fields: any) => {
            if (!err) {
                res.status(200).json({ reportes: rows });
            } else {
                res.status(500).json({ error: 'Error' });
            }
        });
    }

    public async verArchivos(req: Request, res: Response) {
        try {
            const { idReporte } = req.params;
            const data = await pool.query(` SELECT
                                            archivo.codigo,
                                            archivo.fotografia
                                        FROM 
                                            archivo
                                        INNER JOIN formulario 	ON archivo.formulario_codigo = formulario.codigo
                                        INNER JOIN reporte 		ON formulario.reporte_codigo = reporte.codigo 
                                        AND reporte.codigo = ?`, [idReporte]);
            if (data.length > 0) {
                let array = [];
                
                for (const key in data) {
                   console.log(data[key]["codigo"],data[key]["fotografia"]);
                   array.push({codigo:data[key]["codigo"],img:data[key]["fotografia"]+""})
                }
                res.status(200).json({ archivos: array });
            }
            else
                res.status(200).json({ archivos: [] });
        } catch (error) {
            res.status(500).send('Error');
        }
    }

    public async verMensajes(req: Request, res: Response) {
        try {
            const { nombreUsuario } = req.params;
            console.log(nombreUsuario);
            const result = await pool.query(`SELECT 
                                            DATE_FORMAT(mensaje.fecha, "%d/%m/%Y") as fecha, 
                                            TIME_FORMAT(reporte.hora, "%H:%i") as hora, 
                                            mensaje.cuerpo, mensaje.leido 
                                        FROM 
                                            mensaje
                                        INNER JOIN reporte ON mensaje.reporte_codigo = reporte.codigo
                                        INNER JOIN usuario ON reporte.usuario_nombreusuario = usuario.nombreusuario 
                                        AND usuario.nombreusuario = ?`, [nombreUsuario]);
            if (result.length > 0) {

                res.status(200).json({ mensajes: result });
            }
            else
                res.json({ mensajes: [] });
        } catch (error) {
            res.status(500).json('Error');
        }
    }
}

export const controllersReporte = new ControllerRerporte();