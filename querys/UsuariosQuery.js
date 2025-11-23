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
    }
    //===============================Nelson=================================//

    
};