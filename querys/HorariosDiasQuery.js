module.exports = {
    //==========================Nelson====================================
	insertar(horario) {
		return {
            sql: `INSERT INTO horariodias (inicio, fin, Id_dia) VALUES (?, ?, ?)`,
            values: [horario.inicio, horario.fin, horario.Id_dia]
        };
	},
    //===============================Nelson=================================

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

    obtenerPorDia(idDia) {
        return {
            sql: `SELECT 
                hd.Id_HorarioDia, 
                hd.inicio, 
                hd.fin, 
                d.Dia
            FROM horariodias hd
            JOIN Dias d ON hd.Id_dia = d.Id_dia
            WHERE hd.Id_dia = ?
            ORDER BY hd.inicio ASC`,
            values: [idDia]
        };
    },

    //==========================Nelson====================================
	actualizar(horario) {
		return {
            sql: `UPDATE horariodias SET
                inicio = ?,
                fin = ?
            WHERE Id_HorarioDia = ?`,
            values: [horario.inicio, horario.fin, horario.Id_HorarioDia]
        };
	},
    //===============================Nelson=================================

	eliminarById(idHorarioDia) {
		return {
            sql: `DELETE FROM horariodias WHERE Id_HorarioDia = ?`,
            values: [idHorarioDia]
        };
	}
};