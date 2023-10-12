
const mysql = require("mysql2");

const pool = mysql.createPool( {
    host: "localhost",
    user: "root",
    password: "F@rhan2023!@",
    database: "persons",
    waitForConnections: true, // Allow queuing when true
    connectionLimit: 10, // Max number of connections at a time
    queueLimit: 0, // As many people can queue and wait for a spot
})

module.exports = pool;