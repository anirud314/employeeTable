// This is the connection.js that connects to the mySQL
const mysql = require("mysql2");
const myPassword = require("../pw.js");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: myPassword,
    database: "employees"
});

connection.connect(function(err){
    if(err){
        throw(err);
    }
});

module.exports = connection;