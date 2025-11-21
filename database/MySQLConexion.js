const mysql = require('mysql2/promise');

// Las conexiones pool, reutilizan
// conexiones para mejorar el rendimiento
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'barberia',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportar el pool
module.exports = { pool };