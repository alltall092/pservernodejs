const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize({
  database: process.env.DB_NAME || "bcxr6tautk5mcnovnjre",
  username: process.env.DB_USER || "u8ewctaky9ynxod3",
  host: process.env.DB_HOST || "bcxr6tautk5mcnovnjre-mysql.services.clever-cloud.com",
 // port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD || "Nf6QVYf1Q0dXi3nNhMck",
  port: process.env.DB_PORT ||3306,
  dialect: "mysql",
  logging: false,
});

module.exports = db;
