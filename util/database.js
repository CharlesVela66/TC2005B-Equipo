const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'mysql-goatech.alwaysdata.net',
    user: 'goatech',
    database: 'goatech_onyx',
    password: 'Sabritas1!#Vs!Chilaquiles"'
})

module.exports = pool.promise();