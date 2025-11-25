// querys/CitaQuery.js
module.exports = {
  //esto es de nelson
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
  //====================================================================

	obtenerTodos() {
    return `
      SELECT 
        c.Id_cita,
        c.Fecha,
        c.Dia,
        c.Hora,
        c.Id_Barbero,
        ub.Nombre AS BarberoNombre,
        c.Id_servicio,
        s.Servicio,
        s.Descripcion,
        s.Precio,
        c.Id_estadoC,
        ec.EstadoC,
        c.Id_usuario AS Id_cliente,
        uc.Nombre AS ClienteNombre
      FROM Cita c
      JOIN Usuarios ub ON c.Id_Barbero = ub.Id_usuario
      JOIN Servicios s ON c.Id_servicio = s.Id_servicio
      JOIN EstadoCita ec ON c.Id_estadoC = ec.Id_estadoC
      JOIN Usuarios uc ON c.Id_usuario = uc.Id_usuario
      ORDER BY c.Fecha ASC, c.Hora ASC;
    `;
  },

  obtenerByDiaConDetalles(dia) {
    return `
      SELECT 
        c.Id_cita,
        c.Fecha,
        c.Dia,
        c.Hora,
        c.Id_Barbero,
        ub.Nombre AS BarberoNombre,
        c.Id_servicio,
        s.Servicio,
        s.Descripcion,
        s.Precio,
        c.Id_estadoC,
        ec.EstadoC,
        c.Id_usuario AS Id_cliente,
        uc.Nombre AS ClienteNombre
      FROM Cita c
      JOIN Usuarios ub ON c.Id_Barbero = ub.Id_usuario
      JOIN Servicios s ON c.Id_servicio = s.Id_servicio
      JOIN EstadoCita ec ON c.Id_estadoC = ec.Id_estadoC
      JOIN Usuarios uc ON c.Id_usuario = uc.Id_usuario
      WHERE c.Dia = '${dia}'
      ORDER BY c.Fecha ASC, c.Hora ASC;
    `;
  },

  obtenerById(idCita) {
        var sql = `SELECT * FROM cita WHERE Id_cita = ${idCita}`;
        return sql;
  },

  obtenerByIdConDetalles(idCita) {
    return `
      SELECT 
        c.Id_cita,
        c.Fecha,
        c.Dia,
        c.Hora,
        c.Id_Barbero,
        ub.Nombre AS BarberoNombre,
        c.Id_servicio,
        s.Servicio,
        s.Descripcion,
        s.Precio,
        c.Id_estadoC,
        ec.EstadoC,
        c.Id_usuario AS Id_cliente,
        uc.Nombre AS ClienteNombre
      FROM Cita c
      JOIN Usuarios ub ON c.Id_Barbero = ub.Id_usuario
      JOIN Servicios s ON c.Id_servicio = s.Id_servicio
      JOIN EstadoCita ec ON c.Id_estadoC = ec.Id_estadoC
      JOIN Usuarios uc ON c.Id_usuario = uc.Id_usuario
      WHERE c.Id_cita = ${idCita};
    `;
  },

  obtenerByUsuarioConDetalles(idUsuario) {
    return `
      SELECT 
        c.Id_cita,
        c.Fecha,
        c.Dia,
        c.Hora,
        c.Id_Barbero,
        ub.Nombre AS BarberoNombre,
        c.Id_servicio,
        s.Servicio,
        s.Descripcion,
        s.Precio,
        c.Id_estadoC,
        ec.EstadoC,
        c.Id_usuario AS Id_cliente,
        uc.Nombre AS ClienteNombre
      FROM Cita c
      JOIN Usuarios ub ON c.Id_Barbero = ub.Id_usuario
      JOIN Servicios s ON c.Id_servicio = s.Id_servicio
      JOIN EstadoCita ec ON c.Id_estadoC = ec.Id_estadoC
      JOIN Usuarios uc ON c.Id_usuario = uc.Id_usuario
      WHERE c.Id_usuario = ${idUsuario}
      ORDER BY c.Fecha ASC, c.Hora ASC;
    `;
  },

  actualizar(cita) {
    return `
      UPDATE Cita SET
        Fecha = '${cita.Fecha}',
        Dia = '${cita.Dia}',
        Hora = '${cita.Hora}',
        Id_Barbero = '${cita.Id_Barbero}',
        Id_servicio = '${cita.Id_servicio}',
        Id_estadoC = '${cita.Id_estadoC}',
        Id_usuario = '${cita.Id_usuario}'
      WHERE Id_cita = ${cita.Id_cita};
    `;
  },

  eliminarById(idCita) {
    return `DELETE FROM Cita WHERE Id_cita = ${idCita};`;
  },

  //==========================Nelson====================================
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
    //===============================Nelson=================================
};
