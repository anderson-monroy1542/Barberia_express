module.exports = {
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
			?, ?, ?, ?, ?, ?, ?
		)`;
        
        return {
            sql,
            values: [
                cita.Fecha,
                cita.Dia,
                cita.Hora,
                cita.Id_Barbero,
                cita.Id_servicio,
                1, //Id_estadoC en 1 (Pendiente)
                cita.Id_usuario
            ]
        };
	},

	obtenerTodos() {
		var sql = `SELECT c.Id_cita, c.Fecha, c.Dia, c.Hora,
			s.Servicio, s.Precio, ec.EstadoC, c.Id_servicio,
			c.Id_estadoC, c.Id_Barbero, uh.Nombre AS BarberoNombre,
			c.Id_usuario AS Id_cliente, uc.Nombre AS ClienteNombre
		FROM cita c
		JOIN servicios s ON c.Id_servicio = s.Id_servicio
		JOIN estadocita ec ON c.Id_estadoC = ec.Id_estadoC
		LEFT JOIN usuarios uh ON c.Id_Barbero = uh.Id_usuario
		LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
		ORDER BY c.Fecha ASC, c.Hora ASC`;
		return sql;
	},

	obtenerByDiaConDetalles(dia) {
        return {
            sql: `SELECT ... (Tu larga consulta SELECT) ...
                WHERE c.Dia = ?
                ORDER BY c.Fecha ASC, c.Hora ASC`,
            values: [dia]
        };
	},

	obtenerById(idCita) {
		return {
            sql: `SELECT * FROM cita WHERE Id_cita = ?`,
            values: [idCita]
        };
	},

	obtenerByIdConDetalles(idCita) {
		return {
            sql: `SELECT ... (Tu larga consulta SELECT) ...
                WHERE c.Id_cita = ?`,
            values: [idCita]
        };
	},

	obtenerByUsuarioConDetalles(idUsuario) {
		return {
            sql: `SELECT ... (Tu larga consulta SELECT) ...
                WHERE c.Id_usuario = ?
                ORDER BY c.Fecha ASC, c.Hora ASC`,
            values: [idUsuario]
        };
	},

	actualizar(cita) {
		return {
            sql: `UPDATE cita SET
                Fecha = ?,
                Dia = ?,
                Hora = ?,
                Id_Barbero = ?,
                Id_servicio = ?,
                Id_estadoC = ?
            WHERE Id_cita = ?`,
            values: [
                cita.Fecha,
                cita.Dia,
                cita.Hora,
                cita.Id_Barbero,
                cita.Id_servicio,
                cita.Id_estadoC,
                cita.Id_cita
            ]
        };
	},

	eliminarById(idCita) {
		return {
            sql: `DELETE FROM cita WHERE Id_cita = ?`,
            values: [idCita]
        };
	},

    verificarDisponibilidad(cita) {
        return {
            sql: `SELECT COUNT(*) as total 
                    FROM cita 
                    WHERE Id_Barbero = ? 
                    AND Fecha = ? 
                    AND Hora = ?`,
            values: [cita.Id_Barbero, cita.Fecha, cita.Hora]
        };
    },

    obtenerHorarioPorNombreDia(nombreDia) {
        return {
            sql: `SELECT hd.inicio, hd.fin 
                    FROM horariodias hd
                    JOIN dias d ON hd.Id_dia = d.Id_dia
                    WHERE d.Dia = ?`,
            values: [nombreDia]
        };
    },
};