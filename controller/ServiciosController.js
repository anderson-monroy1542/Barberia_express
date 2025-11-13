const { pool } = require("../database/MySQLConexion");
const serviciosQuery = require("../querys/ServiciosQuery");

module.exports = {
    async insertar(servicio) {
        const [result] = await pool.execute(
            serviciosQuery.insertar(servicio)
        );
        return result.insertId;
    },

    async obtenerTodos() {
        const [result] = await pool.query(
            serviciosQuery.obtenerTodos()
        );
        return result;
    },

    async obtenerById(idServicio) {
        const [result] = await pool.query(
            serviciosQuery.obtenerById(idServicio)
        );
        return result[0];
    },

    async actualizar(servicio) {
        const [result] = await pool.execute(
            serviciosQuery.actualizar(servicio)
        );
        return result.affectedRows;
    },

    async eliminarById(idServicio) {
        const [result] = await pool.execute(
            serviciosQuery.eliminarById(idServicio)
        );
        return result.affectedRows;
    }
};
