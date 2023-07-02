// eslint-disable-next-line import/no-extraneous-dependencies
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});
const pool = mysql.createPool({
  connectionLimit: 2,
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Pass@1234",
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || "Contact",
  dateStrings: true,
});

module.exports = pool;
