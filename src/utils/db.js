const { Sequelize } = require("sequelize");
require("dotenv").config();

const db = new Sequelize({
  database: process.env.DB_NAME || "api-archivo",
  username: process.env.DB_USER || "julio",
  host: process.env.DB_HOST || "localhost",
 // port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD || 120786,
  port: process.env.DB_PORT || 5432, // Puerto predeterminado de PostgreSQL
  dialect: "postgres", // Espe
  logging: false,
});

module.exports = db;
