module.exports = {
	insertar(usuario) {
		return {
            sql: `INSERT INTO usuarios (
                Nombre, Apellido, Correo, Contrasena, Id_rol
            ) VALUES (?, ?, ?, ?, ?)`,
            values: [
                usuario.Nombre,
                usuario.Apellido,
                usuario.Correo,
                usuario.Contrasena,
                usuario.Id_rol
            ]
        };
	},

	obtenerByCorreo(correo) {
		return {
            sql: `SELECT * FROM usuarios WHERE Correo = ?`,
            values: [correo]
        };
	},

    actualizar(usuario) {
    return {
        sql: `
            UPDATE usuarios
            SET 
                Nombre = ?,
                Apellido = ?,
                Correo = ?,
                Contrasena = ?,
                Id_rol = ?
            WHERE Id_usuario = ?
        `,
        values: [
            usuario.Nombre,
            usuario.Apellido,
            usuario.Correo,
            usuario.Contrasena,
            usuario.Id_rol,
            usuario.Id_usuario
        ]
    };
},

    //==========================Nelson====================================
    obtenerBarberos() {
        return `SELECT Id_usuario, Nombre, Apellido 
                FROM usuarios 
                WHERE Id_rol = 2 
                ORDER BY Nombre ASC`;
    },
	obtenerClientes() {
        return `SELECT Id_usuario, Nombre, Apellido 
                FROM usuarios 
                WHERE Id_rol = 3 
                ORDER BY Nombre ASC`;
    },
    //===============================Nelson=================================//
    // ==========================NUEVAS FUNCIONES ADMIN====================================
    obtenerTodosConRol() {
        var sql = `SELECT 
            u.Id_usuario, 
            u.Nombre, 
            u.Apellido, 
            u.Correo, 
            u.Id_rol,
            r.Rol
        FROM usuarios u
        JOIN roles r ON u.Id_rol = r.Id_rol
        ORDER BY u.Id_rol ASC, u.Apellido ASC`;
        return sql;
    },

    eliminarById(idUsuario) {
        return {
            sql: `DELETE FROM usuarios WHERE Id_usuario = ?`,
            values: [idUsuario]
        };
    }
    
};