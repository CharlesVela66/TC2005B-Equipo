const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'goatech_onyx',
    password: 'TecProject2023*e'
})

module.exports = pool.promise();