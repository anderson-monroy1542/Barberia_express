module.exports = {

    obtenerTodos() {
        var sql = "SELECT * FROM Dias ORDER BY Id_dia ASC";
        return sql;
    }
};