// controller/CitaController.js
const { pool } = require("../database/MySQLConexion");
const citaQuery = require("../querys/CitaQuery");

module.exports = {
  
  async insertar(cita) {
    const sql = citaQuery.insertar(cita);
    const [result] = await pool.query(sql);
    return result.insertId;
  },

  async obtenerTodos() {
    const sql = citaQuery.obtenerTodos();
    const [rows] = await pool.query(sql);
    return rows;
  },

  async obtenerPorDia(dia) {
    const sql = citaQuery.obtenerByDiaConDetalles(dia);
    const [rows] = await pool.query(sql);
    return rows;
  },

  async obtenerByIdConDetalles(idCita) {
    const sql = citaQuery.obtenerByIdConDetalles(idCita);
    const [rows] = await pool.query(sql);
    return rows[0];
  },

  async actualizar(cita) {
    const sql = citaQuery.actualizar(cita);
    const [result] = await pool.query(sql);
    return result.affectedRows;
  },

  async eliminarById(idCita) {
    const sql = citaQuery.eliminarById(idCita);
    const [result] = await pool.query(sql);
    return result.affectedRows;
  },

  async obtenerByUsuario(idUsuario) {
    const sql = citaQuery.obtenerByUsuarioConDetalles(idUsuario);
    const [rows] = await pool.query(sql);
    return rows;
  }

};
