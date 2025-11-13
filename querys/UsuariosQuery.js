module.exports = {
	insertar(usuario) {

		var sql = `INSERT INTO usuarios (
			Nombre,
			Apellido,
			Correo,
			Contrasena,
			Id_rol
		) VALUES (
			'${usuario.Nombre}',
			'${usuario.Apellido}',
			'${usuario.Correo}',
			'${usuario.Contrasena}',
			'${usuario.Id_rol}'
		)`;
		return sql;
	},


	obtenerByCorreo(correo) {
		var sql = `SELECT * FROM usuarios
		WHERE Correo = '${correo}'`;
		return sql;
	}


};