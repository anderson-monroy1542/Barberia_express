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
        var sql = `SELECT 
            r.Id_resena,
            r.Comentario,
            r.Puntuacion,
            r.Id_cita,
            c.Fecha,
            c.Hora,
            c.Dia,
            s.Servicio AS NombreServicio,
            uc.Nombre AS ClienteNombre,
            uc.Apellido AS ClienteApellido,
            ub.Nombre AS BarberoNombre,
            ub.Apellido AS BarberoApellido
        FROM resenas r
        JOIN cita c ON r.Id_cita = c.Id_cita
        LEFT JOIN servicios s ON c.Id_servicio = s.Id_servicio
        LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
        LEFT JOIN usuarios ub ON c.Id_Barbero = ub.Id_usuario
        ORDER BY r.Id_resena DESC`;
        return sql;
    },

    obtenerById(idResena) {
        var sql = `SELECT 
            r.Id_resena,
            r.Comentario,
            r.Puntuacion,
            r.Id_cita,
            c.Fecha,
            c.Hora,
            c.Dia,
            s.Servicio AS NombreServicio,
            uc.Nombre AS ClienteNombre,
            uc.Apellido AS ClienteApellido,
            ub.Nombre AS BarberoNombre,
            ub.Apellido AS BarberoApellido
        FROM resenas r
        JOIN cita c ON r.Id_cita = c.Id_cita
        LEFT JOIN servicios s ON c.Id_servicio = s.Id_servicio
        LEFT JOIN usuarios uc ON c.Id_usuario = uc.Id_usuario
        LEFT JOIN usuarios ub ON c.Id_Barbero = ub.Id_usuario
        WHERE r.Id_resena = ${idResena}`;
        return sql;
    },

    actualizar(resena) {
        var sql = `UPDATE resenas SET
        Comentario = '${resena.Comentario}',
        Puntuacion = '${resena.Puntuacion}'
        WHERE Id_resena = ${resena.Id_resena}`;
        return sql;
    },

    eliminarById(idResena) {
        var sql = `DELETE FROM resenas WHERE Id_resena = ${idResena}`;
        return sql;
    }
};