const { pool } = require("../database/MySQLConexion");
const diasQuery = require("../querys/DiasQuery");

module.exports = {

	async obtenerTodos() {
		const [result] = await pool.query(
			diasQuery.obtenerTodos()
		);
		return result;
	}
};