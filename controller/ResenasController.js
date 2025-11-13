const { pool } = require("../database/MySQLConexion");
const resenasQuery = require("../querys/ResenasQuery");

module.exports = {
    async insertar(resena) {
        const [result] = await pool.execute(
            resenasQuery.insertar(resena)
        );
        return result.insertId;
    },

    async obtenerTodos() {
        const [result] = await pool.query(
            resenasQuery.obtenerTodos()
        );
        return result;
    },

    async obtenerById(idResena) {
        const [result] = await pool.query(
            resenasQuery.obtenerById(idResena)
        );
        return result[0];
    },

    async actualizar(resena) {
        const [result] = await pool.execute(
            resenasQuery.actualizar(resena)
        );
        return result.affectedRows;
    },

    async eliminarById(idResena) {
        const [result] = await pool.execute(
            resenasQuery.eliminarById(idResena)
        );
        return result.affectedRows;
    }
};
