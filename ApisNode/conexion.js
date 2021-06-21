const mysql = require("mysql");

module.exports = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: "3306", // en su caso poner 3306
    database: "sissstem"
});