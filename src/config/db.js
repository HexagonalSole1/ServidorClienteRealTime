import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: process.env.HOST|| "127.0.0.1",
  user: process.env.USER|| "root",
  password: process.env.PASSWORD|| "HexagonalSole89",
  database: process.env.DATABASE|| "chat",
});

export default db.promise();
