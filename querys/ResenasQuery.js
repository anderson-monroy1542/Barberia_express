module.exports = {
	insertar(resena) {
		var sql = `INSERT INTO resenas (
			Comentario,
			Puntuacion,
			Id_cita
		) VALUES (
			'${resena.Comentario}',
			'${resena.Puntuacion}',
			'${resena.Id_cita}'
		)`;
		return sql;
	},

	obtenerTodos() {
		var sql = `SELECT r.Id_resena,
		r.Comentario,
		r.Puntuacion,
		r.Id_cita,
		c.Id_cita AS CitaId,
		h.Dia,
		h.Hora,
		h.Id_usuario AS Id_barbero,
		ub.Nombre AS BarberoNombre,
		ub.Apellido AS BarberoApellido,
		c.Id_usuario AS Id_cliente,
		uc.Nombre AS ClienteNombre,
		uc.Apellido AS ClienteApellido
	FROM resenas r
	JOIN cita c ON r.Id_cita = c.Id_cita
	JOIN horarios h ON c.Id_horario = h.Id_horario
	LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
	LEFT JOIN usuarios ub ON h.Id_usuario = ub.Id_usuario
	`;
		return sql;
	},

	obtenerById(idResena) {
		var sql = `SELECT r.Id_resena,
		r.Comentario,
		r.Puntuacion,
		r.Id_cita,
		c.Id_cita AS CitaId,
		h.Dia,
		h.Hora,
		h.Id_usuario AS Id_barbero,
		ub.Nombre AS BarberoNombre,
		ub.Apellido AS BarberoApellido,
		c.Id_usuario AS Id_cliente,
		uc.Nombre AS ClienteNombre,
		uc.Apellido AS ClienteApellido
	FROM resenas r
	JOIN cita c ON r.Id_cita = c.Id_cita
	JOIN horarios h ON c.Id_horario = h.Id_horario
	LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
	LEFT JOIN usuarios ub ON h.Id_usuario = ub.Id_usuario
	WHERE r.Id_resena = ${idResena}`;
		return sql;
	},

	actualizar(resena) {
		var sql = `UPDATE resenas SET
		Comentario = '${resena.Comentario}',
		Puntuacion = '${resena.Puntuacion}',
		WHERE Id_resena = ${resena.Id_resena}`;
		return sql;
	},

	eliminarById(idResena) {
		var sql = `DELETE FROM resenas WHERE Id_resena = ${idResena}`;
		return sql;
	}
};
