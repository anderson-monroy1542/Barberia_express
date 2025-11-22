const { pool } = require("../database/MySQLConexion");
const horarioDiasQuery = require("../querys/HorariosDiasQuery");

module.exports = {
    async insertar(horario) {
        const query = horarioDiasQuery.insertar(horario);
        const [result] = await pool.execute(query.sql, query.values);
        return result.insertId;
    },

    async obtenerTodos() {
        const sql = horarioDiasQuery.obtenerTodos();
        const [result] = await pool.query(sql);
        return result;
    },

    async obtenerPorDia(idDia) {
        const query = horarioDiasQuery.obtenerPorDia(idDia);
        const [result] = await pool.query(query.sql, query.values);
        return result;
    },

    async actualizar(horario) {
        const query = horarioDiasQuery.actualizar(horario);
        const [result] = await pool.execute(query.sql, query.values);
        return result.affectedRows;
    },

    async eliminarById(idHorarioDia) {
        const query = horarioDiasQuery.eliminarById(idHorarioDia);
        const [result] = await pool.execute(query.sql, query.values);
        return result.affectedRows;
    }
};