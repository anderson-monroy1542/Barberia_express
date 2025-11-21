const { pool } = require("../database/MySQLConexion");
const usuariosQuery = require("../querys/UsuariosQuery");
const bcrypt = require('bcrypt'); 

const saltRounds = 10; 

module.exports = {
    async insertar(usuario) {
        const queryVerificar = usuariosQuery.obtenerByCorreo(usuario.Correo);
        const [existentes] = await pool.query(queryVerificar.sql, queryVerificar.values);

        if (existentes.length > 0) {
            throw "El correo electrónico ya está registrado";
        }
        
        const passwordPlana = usuario.Contrasena;
        const hash = await bcrypt.hash(passwordPlana, saltRounds);
        usuario.Contrasena = hash; 

        const queryInsertar = usuariosQuery.insertar(usuario);
        const [result] = await pool.execute(queryInsertar.sql, queryInsertar.values);
        
        return result.insertId;
    },

    async obtenerByCorreoByPassword(correo, password) {
        try {
            const query = usuariosQuery.obtenerByCorreo(correo);
            const [result] = await pool.query(query.sql, query.values);
    
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

    async obtenerBarberos() {
        const sql = usuariosQuery.obtenerBarberos();
        const [result] = await pool.query(sql);
        return result; //lista de barberos
    },
    async obtenerClientes() {
        const sql = usuariosQuery.obtenerClientes();
        const [result] = await pool.query(sql);
        return result; //lista de clientes
    }
};