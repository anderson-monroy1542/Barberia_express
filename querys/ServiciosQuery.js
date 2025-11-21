module.exports = {
	insertar(servicio) {
        return {
            sql: `INSERT INTO servicios (
                Servicio, Descripcion, Precio, Id_estadoS
            ) VALUES (?, ?, ?, ?)`,
            values: [
                servicio.Servicio,
                servicio.Descripcion,
                servicio.Precio,
                servicio.Id_estadoS
            ]
        };
	},

	obtenerTodos() {
		var sql = `SELECT s.Id_servicio,
            s.Servicio,
            s.Descripcion,
            s.Precio,
            s.Id_estadoS,
            es.EstadoS
        FROM servicios s
        JOIN estadoservicios es ON s.Id_estadoS = es.Id_estadoS
        ORDER BY s.Servicio ASC`;
		return sql;
	},

	obtenerById(idServicio) {
        return {
            sql: `SELECT s.Id_servicio,
                s.Servicio,
                s.Descripcion,
                s.Precio,
                s.Id_estadoS,
                es.EstadoS
            FROM servicios s
            JOIN estadoservicios es ON s.Id_estadoS = es.Id_estadoS
            WHERE s.Id_servicio = ?`,
            values: [idServicio]
        };
	},

	actualizar(servicio) {
        return {
            sql: `UPDATE servicios SET
                Servicio = ?,
                Descripcion = ?,
                Precio = ?,
                Id_estadoS = ?
                WHERE Id_servicio = ?`,
            values: [
                servicio.Servicio,
                servicio.Descripcion,
                servicio.Precio,
                servicio.Id_estadoS,
                servicio.Id_servicio
            ]
        };
	},

	eliminarById(idServicio) {
        return {
            sql: `DELETE FROM servicios WHERE Id_servicio = ?`,
            values: [idServicio]
        };
	}
};