const mysql = require('mysql2');

const con = mysql.createConnection({
    host:'database',
    user:'root',
    password:'123456',
    database:'dbmovements'
});

con.connect();

module.exports = con;