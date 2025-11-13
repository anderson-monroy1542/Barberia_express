module.exports = {
	insertar(cita) {
		var sql = `INSERT INTO cita (
			Id_horario,
			Id_servicio,
			Id_estadoC,
			Id_usuario
		) VALUES (
			'${cita.Id_horario}',
			'${cita.Id_servicio}',
			'${cita.Id_estadoC}',
			'${cita.Id_usuario}'
		)`;
		return sql;
	},


	obtenerTodos() {
		var sql = `SELECT c.Id_cita,
		h.Dia,
		h.Hora,
		s.Servicio,
		s.Precio,
		ec.EstadoC,
		c.Id_horario,
		c.Id_servicio,
		c.Id_estadoC,
		h.Id_usuario AS Id_barbero,
		uh.Nombre AS BarberoNombre,
		c.Id_usuario AS Id_cliente,
		uc.Nombre AS ClienteNombre
	FROM cita c
	JOIN horarios h ON c.Id_horario = h.Id_horario
	JOIN servicios s ON c.Id_servicio = s.Id_servicio
	JOIN estadocita ec ON c.Id_estadoC = ec.Id_estadoC
	LEFT JOIN usuarios uh ON h.Id_usuario = uh.Id_usuario
	LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
	ORDER BY c.Id_cita ASC`;
		return sql;
	},

	obtenerByDiaConDetalles(dia) {
		var sql = `SELECT c.Id_cita,
		h.Dia,
		h.Hora,
		s.Servicio,
		s.Precio,
		ec.EstadoC,
		c.Id_horario,
		c.Id_servicio,
		c.Id_estadoC,
		h.Id_usuario AS Id_barbero,
		uh.Nombre AS BarberoNombre,
		c.Id_usuario AS Id_cliente,
		uc.Nombre AS ClienteNombre
	FROM cita c
	JOIN horarios h ON c.Id_horario = h.Id_horario
	JOIN servicios s ON c.Id_servicio = s.Id_servicio
	JOIN estadocita ec ON c.Id_estadoC = ec.Id_estadoC
	LEFT JOIN usuarios uh ON h.Id_usuario = uh.Id_usuario
	LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
	WHERE h.Dia = '${dia}'
	ORDER BY c.Id_cita ASC`;
		return sql;
	},

	obtenerById(idCita) {
		var sql = `SELECT * FROM cita WHERE Id_cita = ${idCita}`;
		return sql;
	},

	/** Obtiene todos los detalles de una Cita específica por su ID. 
	 * Incluye JOINS con barbero, cliente, servicio, etc.
	 */
	obtenerByIdConDetalles(idCita) {
		var sql = `SELECT c.Id_cita,
			h.Dia,
			h.Hora,
			s.Servicio,
			s.Precio,
			ec.EstadoC,
			c.Id_horario,
			c.Id_servicio,
			c.Id_estadoC,
			h.Id_usuario AS Id_barbero,
			uh.Nombre AS BarberoNombre,
			c.Id_usuario AS Id_cliente,
			uc.Nombre AS ClienteNombre
		FROM cita c
		JOIN horarios h ON c.Id_horario = h.Id_horario
		JOIN servicios s ON c.Id_servicio = s.Id_servicio
		JOIN estadocita ec ON c.Id_estadoC = ec.Id_estadoC
		LEFT JOIN usuarios uh ON h.Id_usuario = uh.Id_usuario
		LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
		WHERE c.Id_cita = ${idCita}`; // El filtro por ID de Cita
		return sql;
	},

	obtenerByUsuarioConDetalles(idUsuario) {
		var sql = `SELECT c.Id_cita,
		h.Dia,
		h.Hora,
		s.Servicio,
		s.Precio,
		ec.EstadoC,
		c.Id_horario,
		c.Id_servicio,
		c.Id_estadoC,
		h.Id_usuario AS Id_barbero,
		uh.Nombre AS BarberoNombre,
		c.Id_usuario AS Id_cliente,
		uc.Nombre AS ClienteNombre
	FROM cita c
	JOIN horarios h ON c.Id_horario = h.Id_horario
	JOIN servicios s ON c.Id_servicio = s.Id_servicio
	JOIN estadocita ec ON c.Id_estadoC = ec.Id_estadoC
	LEFT JOIN usuarios uh ON h.Id_usuario = uh.Id_usuario
	LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
	WHERE c.Id_usuario = ${idUsuario}
	ORDER BY h.Dia ASC, h.Hora ASC`;
		return sql;
	},

	actualizar(cita) {
		var sql = `UPDATE cita SET
		Id_horario = '${cita.Id_horario}',
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