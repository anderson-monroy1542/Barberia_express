module.exports = {
    /**
     * Inserta un nuevo bloque de horario (ej. Lunes de 9:00 a 10:00)
     */
	insertar(horario) {
		var sql = `INSERT INTO horariodias (
            inicio,
            fin,
            Id_dia
        ) VALUES (
            '${horario.inicio}',
            '${horario.fin}',
            '${horario.Id_dia}'
        )`;
		return sql;
	},

    /**
     * Obtiene todos los horarios de todos los días, con el nombre del día.
     */
	obtenerTodos() {
		var sql = `SELECT 
            hd.Id_HorarioDia, 
            hd.inicio, 
            hd.fin, 
            d.Dia,
            hd.Id_dia
        FROM horariodias hd
        JOIN Dias d ON hd.Id_dia = d.Id_dia
        ORDER BY d.Id_dia ASC, hd.inicio ASC`;
		return sql;
	},

    /**
     * Obtiene todos los horarios para un solo día específico.
     */
    obtenerPorDia(idDia) {
        var sql = `SELECT 
            hd.Id_HorarioDia, 
            hd.inicio, 
            hd.fin, 
            d.Dia
        FROM horariodias hd
        JOIN Dias d ON hd.Id_dia = d.Id_dia
        WHERE hd.Id_dia = ${idDia}
        ORDER BY hd.inicio ASC`;
       return sql;
    },

    /**
     * Actualiza un bloque de horario (ej. cambiar la hora de inicio)
     */
	actualizar(horario) {
		var sql = `UPDATE horariodias SET
            inicio = '${horario.inicio}',
            fin = '${horario.fin}',
            Id_dia = '${horario.Id_dia}'
        WHERE Id_HorarioDia = ${horario.Id_HorarioDia}`;
		return sql;
	},

    /**
     * Elimina un bloque de horario por su ID.
     */
	eliminarById(idHorarioDia) {
		var sql = `DELETE FROM horariodias WHERE Id_HorarioDia = ${idHorarioDia}`;
		return sql;
	}
};