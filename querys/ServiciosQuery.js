module.exports = {
	insertar(servicio) {
		var sql = `INSERT INTO servicios (
			Servicio,
			Descripcion,
			Precio,
			Id_estadoS
		) VALUES (
			'${servicio.Servicio}',
			'${servicio.Descripcion}',
			'${servicio.Precio}',
			'${servicio.Id_estadoS}'
		)`;
		return sql;
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
		var sql = `SELECT s.Id_servicio,
		s.Servicio,
		s.Descripcion,
		s.Precio,
		s.Id_estadoS,
		es.EstadoS
	FROM servicios s
	JOIN estadoservicios es ON s.Id_estadoS = es.Id_estadoS
	WHERE s.Id_servicio = ${idServicio}`;
		return sql;
	},

	actualizar(servicio) {
		var sql = `UPDATE servicios SET
		Servicio = '${servicio.Servicio}',
		Descripcion = '${servicio.Descripcion}',
		Precio = '${servicio.Precio}',
		Id_estadoS = '${servicio.Id_estadoS}'
		WHERE Id_servicio = ${servicio.Id_servicio}`;
		return sql;
	},

	eliminarById(idServicio) {
		var sql = `DELETE FROM servicios WHERE Id_servicio = ${idServicio}`;
		return sql;
	}
};
