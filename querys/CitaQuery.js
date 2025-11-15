module.exports = {
	/**
	 * CORREGIDO: Inserta los nuevos campos de la tabla Cita
	 */
	insertar(cita) {
		var sql = `INSERT INTO cita (
			Fecha,
			Dia,
			Hora,
			Id_Barbero,
			Id_servicio,
			Id_estadoC,
			Id_usuario
		) VALUES (
			'${cita.Fecha}',
			'${cita.Dia}',
			'${cita.Hora}',
			'${cita.Id_Barbero}',
			'${cita.Id_servicio}',
			'${cita.Id_estadoC}',
			'${cita.Id_usuario}'
		)`;
		return sql;
	},

	/**
	 * CORREGIDO: Ya no hace JOIN con 'horarios'.
	 * Lee Fecha/Dia/Hora directamente de 'cita'.
	 * Hace JOIN con 'usuarios' usando 'Id_Barbero' de la cita.
	 */
	obtenerTodos() {
		var sql = `SELECT c.Id_cita,
			c.Fecha,
			c.Dia,
			c.Hora,
			s.Servicio,
			s.Precio,
			ec.EstadoC,
			c.Id_servicio,
			c.Id_estadoC,
			c.Id_Barbero,
			uh.Nombre AS BarberoNombre,
			c.Id_usuario AS Id_cliente,
			uc.Nombre AS ClienteNombre
		FROM cita c
		JOIN servicios s ON c.Id_servicio = s.Id_servicio
		JOIN estadocita ec ON c.Id_estadoC = ec.Id_estadoC
		LEFT JOIN usuarios uh ON c.Id_Barbero = uh.Id_usuario
		LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
		ORDER BY c.Fecha ASC, c.Hora ASC`;
		return sql;
	},

	/**
	 * CORREGIDO: Busca por 'c.Dia' en lugar de 'h.Dia'.
	 */
	obtenerByDiaConDetalles(dia) {
		var sql = `SELECT c.Id_cita,
			c.Fecha,
			c.Dia,
			c.Hora,
			s.Servicio,
			s.Precio,
			ec.EstadoC,
			c.Id_servicio,
			c.Id_estadoC,
			c.Id_Barbero,
			uh.Nombre AS BarberoNombre,
			c.Id_usuario AS Id_cliente,
			uc.Nombre AS ClienteNombre
		FROM cita c
		JOIN servicios s ON c.Id_servicio = s.Id_servicio
		JOIN estadocita ec ON c.Id_estadoC = ec.Id_estadoC
		LEFT JOIN usuarios uh ON c.Id_Barbero = uh.Id_usuario
		LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
		WHERE c.Dia = '${dia}'
		ORDER BY c.Fecha ASC, c.Hora ASC`;
		return sql;
	},

	obtenerById(idCita) {
		var sql = `SELECT * FROM cita WHERE Id_cita = ${idCita}`;
		return sql;
	},

	/**
	 * CORREGIDO: La lógica de JOINs es la nueva.
	 */
	obtenerByIdConDetalles(idCita) {
		var sql = `SELECT c.Id_cita,
			c.Fecha,
			c.Dia,
			c.Hora,
			s.Servicio,
			s.Precio,
			ec.EstadoC,
			c.Id_servicio,
			c.Id_estadoC,
			c.Id_Barbero,
			uh.Nombre AS BarberoNombre,
			c.Id_usuario AS Id_cliente,
			uc.Nombre AS ClienteNombre
		FROM cita c
		JOIN servicios s ON c.Id_servicio = s.Id_servicio
		JOIN estadocita ec ON c.Id_estadoC = ec.Id_estadoC
		LEFT JOIN usuarios uh ON c.Id_Barbero = uh.Id_usuario
		LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
		WHERE c.Id_cita = ${idCita}`;
		return sql;
	},

	/**
	 * CORREGIDO: La lógica de JOINs es la nueva.
	 */
	obtenerByUsuarioConDetalles(idUsuario) {
		var sql = `SELECT c.Id_cita,
			c.Fecha,
			c.Dia,
			c.Hora,
			s.Servicio,
			s.Precio,
			ec.EstadoC,
			c.Id_servicio,
			c.Id_estadoC,
			c.Id_Barbero,
			uh.Nombre AS BarberoNombre,
			c.Id_usuario AS Id_cliente,
			uc.Nombre AS ClienteNombre
		FROM cita c
		JOIN servicios s ON c.Id_servicio = s.Id_servicio
		JOIN estadocita ec ON c.Id_estadoC = ec.Id_estadoC
		LEFT JOIN usuarios uh ON c.Id_Barbero = uh.Id_usuario
		LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
		WHERE c.Id_usuario = ${idUsuario}
		ORDER BY c.Fecha ASC, c.Hora ASC`;
		return sql;
	},

	/**
	 * CORREGIDO: Actualiza los nuevos campos.
	 */
	actualizar(cita) {
		var sql = `UPDATE cita SET
			Fecha = '${cita.Fecha}',
			Dia = '${cita.Dia}',
			Hora = '${cita.Hora}',
			Id_Barbero = '${cita.Id_Barbero}',
			Id_servicio = '${cita.Id_servicio}',
			Id_estadoC = '${cita.Id_estadoC}'
		WHERE Id_cita = ${cita.Id_cita}`;
		return sql;
	},

	eliminarById(idCita) {
		var sql = `DELETE FROM cita WHERE Id_cita = ${idCita}`;
		return sql;
	}
};