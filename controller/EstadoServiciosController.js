const { pool } = require("../database/MySQLConexion");
const estadoServiciosQuery = require("../querys/EstadoServiciosQuery");

module.exports = {
	async obtenerTodos() {
		const [result] = await pool.query(
			estadoServiciosQuery.obtenerTodos()
		);
		return result;
	}
};
