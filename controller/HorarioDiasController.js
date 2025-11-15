const { pool } = require("../database/MySQLConexion");
const horarioDiasQuery = require("../querys/HorariosDiasQuery");

module.exports = {
    async insertar(horario) {
        const [result] = await pool.execute(
            horarioDiasQuery.insertar(horario)
        );
        return result.insertId;
    },

    async obtenerTodos() {
        const [result] = await pool.query(
            horarioDiasQuery.obtenerTodos()
        );
        return result;
    },

    async obtenerPorDia(idDia) {
        const [result] = await pool.query(
            horarioDiasQuery.obtenerPorDia(idDia)
        );
        return result;
    },

    async actualizar(horario) {
        const [result] = await pool.execute(
            horarioDiasQuery.actualizar(horario)
        );
        return result.affectedRows;
    },

    async eliminarById(idHorarioDia) {
        const [result] = await pool.execute(
            horarioDiasQuery.eliminarById(idHorarioDia)
        );
        return result.affectedRows;
    }
};