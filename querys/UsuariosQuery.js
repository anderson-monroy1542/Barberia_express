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
        let fields = [];
        let values = [];
        if (usuario.Nombre) {
            fields.push('Nombre = ?');
            values.push(usuario.Nombre);
        }
        if (usuario.Apellido) {
            fields.push('Apellido = ?');
            values.push(usuario.Apellido);
        }
        if (usuario.Correo) {
            fields.push('Correo = ?');
            values.push(usuario.Correo);
        }
        if (usuario.Contrasena && usuario.Contrasena !== '') {
            fields.push('Contrasena = ?');
            values.push(usuario.Contrasena);
        }
        if (usuario.Id_rol) {
            fields.push('Id_rol = ?');
            values.push(usuario.Id_rol);
        }

        // Si no hay campos para actualizar, la actualización no tiene sentido, pero el Controller lo verifica
        if (fields.length === 0) {
            return { sql: '', values: [] };
        }

        // Construir la consulta SQL
        let sql = `UPDATE usuarios SET ${fields.join(', ')} WHERE Id_usuario = ?`;
        values.push(usuario.Id_usuario);

        return {
            sql: sql,
            values: values
        };
        //corregiendo error de actualizacion completa
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
    // ==========================josue====================================
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