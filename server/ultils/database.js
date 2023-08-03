const mysql = require("mysql2");

let pool = mysql.createPool({
  database: "cms_db",
  host: "localhost",
  user: "root",
  password: "hongphuc27298",
  port: 3306,
});
module.exports = pool.promise();
