const { pool } = require("../database/MySQLConexion");
const rolesQuery = require("../querys/RolesQuey");

module.exports = {
	async obtenerTodos() {
		const [result] = await pool.query(
			rolesQuery.obtenerTodos()
		);
		return result;
	},

	async obtenerById(idRol) {
		const [result] = await pool.query(
			rolesQuery.obtenerById(idRol)
		);
		return result[0];
	}
};
