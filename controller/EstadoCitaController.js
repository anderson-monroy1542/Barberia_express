const { pool } = require("../database/MySQLConexion");
const estadoCitaQuery = require("../querys/EstadoCitaQuery");

module.exports = {
	async obtenerTodos() {
		const [result] = await pool.query(
			estadoCitaQuery.obtenerTodos()
		);
		return result;
	}
};
