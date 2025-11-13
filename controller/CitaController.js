const { pool } = require("../database/MySQLConexion");
const citaQuery = require("../querys/CitaQuery");

module.exports = {
	async insertar(cita) {
		const [result] = await pool.execute(
			citaQuery.insertar(cita)
		);
		return result.insertId;
	},

	async obtenerTodos() {
		const [result] = await pool.query(
			citaQuery.obtenerTodos()
		);
		return result;
	},

	async obtenerPorDia(dia) {
		// dia debe ser en formato YYYY-MM-DD
		const [result] = await pool.query(
			citaQuery.obtenerByDiaConDetalles(dia)
		);
		return result;
	},
	/**
	 * 	Llama al query para obtener una cita específica con detalles.
	 * 	Devuelve un solo objeto.
	 */
	async obtenerByIdConDetalles(idCita) {
		const [result] = await pool.query(
			citaQuery.obtenerByIdConDetalles(idCita)
		);
		return result[0]; // Devuelve solo el primer resultado
	},
	

	async actualizar(cita) {
		const [result] = await pool.execute(
			citaQuery.actualizar(cita)
		);
		return result.affectedRows;
	},

	async eliminarById(idCita) {
		const [result] = await pool.execute(
			citaQuery.eliminarById(idCita)
		);
		return result.affectedRows;
	},

	async obtenerByUsuario(idUsuario) {
		const [result] = await pool.query(
			citaQuery.obtenerByUsuarioConDetalles(idUsuario)
		);
		return result;
	}
};