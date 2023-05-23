import { Request, Response } from 'express';

import pool from '../database';

class ControllersLogin{

    public async loguear(req:Request,res:Response){
        const {nombreUsuario, contrasenia} = req.body;
        let result = await pool.query('select * from usuario where nombreusuario = ? and contrasenia = ?',[nombreUsuario, contrasenia]);
        
        //valido que retorne mas de 1 dato
        if(result.length > 0){
            res.status(200).send(result[0]); //existe
        }else{
            res.status(500).send(false); //no existe
        }
    }
}

export const controllersLogin = new ControllersLogin();