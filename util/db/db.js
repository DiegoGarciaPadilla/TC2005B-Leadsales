// Se requiere crear un archivo llamado keys.json en la carpeta util/db con la siguiente estructura:
// {
//     "host": "localhost",
//     "user": "",
//     "password": "",
//     "database": ""
// }

const mysql = require('mysql2');

const keys = require('./keys.json');

const pool = mysql.createPool({
    host: keys.host,
    user: keys.user,
    database: keys.database,
    password: keys.password,
});

module.exports = pool.promise();