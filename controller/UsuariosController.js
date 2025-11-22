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
    },
    
    async getUsuariosFiltrados(req, res) {
        try {
            // 1. Obtener los parámetros de búsqueda (search) y filtro (role_id) de la URL
            const { search, role_id } = req.query;

            // 2. Ejecutar la consulta en la base de datos con los filtros.
            const usuarios = await usuariosQuery.buscarUsuarios({ search, role_id });

            // 3. Respuesta exitosa
            return res.json({
                status: 'success',
                usuarios: usuarios // El array de usuarios
            });

        } catch (error) {
            console.error('Error al obtener usuarios filtrados:', error);
            // Respuesta de error estándar
            return res.status(500).json({ 
                status: 'error', 
                message: 'Error interno del servidor al buscar usuarios.' 
            });
        }
    }
};