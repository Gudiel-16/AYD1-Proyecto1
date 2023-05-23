import { Request, Response } from 'express';

import pool from '../database';

class ControllerMensaje{

    public async editarLeido(req:Request,res:Response){
        const {idMensaje} = req.params;
        const {estado} = req.body;
        let result = await pool.query('select * from mensaje where leido = 1 and codigo = ?',[idMensaje]);
        if(result.length>0){
            res.status(500).send('Mensaje En Estado Leido');
        }else{
            await pool.query('UPDATE mensaje set leido = ? WHERE codigo = ?',[estado, idMensaje]);
            res.status(200).send('Mensaje Actualizado');
        }        
    }
}

export const controllersMensaje = new ControllerMensaje();