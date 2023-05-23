import { Request, Response } from 'express';

import pool from '../database';

class ControllersUsuario{
    
    public async registrar(req:Request,res:Response){
        //const {nombreUsuario, dpi, nombre, contrasenia, tipousuario_codigo} = req.body;
        const {nombreUsuario} = req.body;
        let result = await pool.query('select * from usuario where nombreusuario = ?',[nombreUsuario]);

        if(result.length>0){
            res.status(500).send('Usuario Existente');
        }else{
            await pool.query('INSERT INTO usuario set ?',[req.body]);
            res.status(200).send('Usuario Registrado');
        }

    }

    public async editar(req:Request,res:Response){
        try {
            const {nombreUsuario} = req.params;
            const{dpi,nombre,contrasenia,tipousuario_codigo} = req.body;
            await pool.query('UPDATE usuario set dpi = ?, nombre = ?, contrasenia = ?, tipousuario_codigo = ? WHERE nombreUsuario = ?',[dpi,nombre,contrasenia,tipousuario_codigo,nombreUsuario]);
            res.status(200).send('Usuario Actualizado');
        } catch (error) {
            res.status(500).send('Error'); //da error si en el tipousuario_codigo viene una letra, en vez de un numero
        }
        
    }

    public async eliminar(req:Request,res:Response){
        
        const {nombreUsuario} = req.params;
        let result = await pool.query('select * from usuario where nombreusuario = ?',[nombreUsuario]);

        if(result.length>0){
            await pool.query('DELETE FROM usuario WHERE nombreUsuario = ?',[nombreUsuario]);
            res.status(200).send('Usuario Eliminado');
        }else{
            res.status(500).send('Usuario No Existe');
        }
    }

    public async obtenerUsuario(req: Request, res: Response) {
        const {nombreUsuario} = req.params;
        await pool.query(`SELECT * FROM usuario WHERE nombreusuario = '${[nombreUsuario]}';`, (err: any, rows: any, fields: any) => {
            if (!err) {
                res.status(200).json({ usuario: rows });
            } else {
                res.status(500).json({ error: 'Error' });
            }
        });
    }

    public async obtenerUsuarios(req: Request, res: Response) {
        await pool.query(`SELECT * FRom usuario;`, (err: any, rows: any, fields: any) => {
            if (!err) {
                res.status(200).json({ reportes: rows });
            } else {
                res.status(500).json({ error: 'Error' });
            }
        });
    }
}

export const controllersUsuario = new ControllersUsuario();