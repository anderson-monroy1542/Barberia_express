const { pool } = require("../database/MySQLConexion");
const serviciosQuery = require("../querys/ServiciosQuery");

module.exports = {
    async insertar(servicio) {
        const query = serviciosQuery.insertar(servicio);
        const [result] = await pool.execute(query.sql, query.values);
        return result.insertId;
    },

    async obtenerTodos() {
        const sql = serviciosQuery.obtenerTodos();
        const [result] = await pool.query(sql);
        return result;
    },

    async obtenerById(idServicio) {
        const query = serviciosQuery.obtenerById(idServicio);
        const [result] = await pool.query(query.sql, query.values);
        return result[0];
    },

    async actualizar(servicio) {
        const query = serviciosQuery.actualizar(servicio);
        const [result] = await pool.execute(query.sql, query.values);
        return result.affectedRows;
    },

    async eliminarById(idServicio) {
        const query = serviciosQuery.eliminarById(idServicio);
        const [result] = await pool.execute(query.sql, query.values);
        return result.affectedRows;
    }
};