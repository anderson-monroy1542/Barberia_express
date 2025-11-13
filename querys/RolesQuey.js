module.exports = {
    obtenerTodos() {
        var sql = `SELECT * FROM roles
        ORDER BY Rol ASC`;
        return sql;
    },

    obtenerById(idRol) {
        var sql = `SELECT * FROM roles
        WHERE Id_rol = ${idRol}`;
        return sql;
    }
};
