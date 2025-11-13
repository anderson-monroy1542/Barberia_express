const { pool } = require("../database/MySQLConexion");
const usuariosQuery = require("../querys/UsuariosQuery");
const bcrypt = require('bcrypt'); 

const saltRounds = 10; 

module.exports = {
    async insertar(usuario) {

        const sqlVerificar = usuariosQuery.obtenerByCorreo(usuario.Correo);
        const [existentes] = await pool.query(sqlVerificar);

        if (existentes.length > 0) {
            throw "El correo electrónico ya está registrado";
        }
        const passwordPlana = usuario.Contrasena;
        const hash = await bcrypt.hash(passwordPlana, saltRounds);
        usuario.Contrasena = hash; 
        const [result] = await pool.execute(
            usuariosQuery.insertar(usuario)
        );
        return result.insertId;
    },

    async obtenerByCorreoByPassword(correo, password) {
        try {

            const [result] = await pool.query(
                usuariosQuery.obtenerByCorreo(correo)
            );
    

            if (result.length > 0) {
    

                const usuarioDB = result[0];
                const isMatch = await bcrypt.compare(password, usuarioDB.Contrasena);
                if (isMatch) {

                    return usuarioDB;
                } else {

                    throw "Credenciales inválidas";
                }
            } else {

                throw "Credenciales inválidas";
            }
        } catch (error) {
            throw error
        }
    }
};