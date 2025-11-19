// querys/CitaQuery.js
module.exports = {

  insertar(cita) {
    return `
      INSERT INTO Cita (
        Fecha,
        Dia,
        Hora,
        Id_Barbero,
        Id_servicio,
        Id_estadoC,
        Id_usuario
      )
      VALUES (
        '${cita.Fecha}',
        '${cita.Dia}',
        '${cita.Hora}',
        '${cita.Id_Barbero}',
        '${cita.Id_servicio}',
        '${cita.Id_estadoC}',
        '${cita.Id_usuario}'
      );
    `;
  },

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
  }
};
