import express from "express";
import db from "./src/config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import ConectarSocket from "./src/middlewares/socket.io/socket.js"


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;


const server = createServer(app);

ConectarSocket(server);


server.listen(PORT, () => {
  console.log(`Servidor y Socket.IO en ejecución en http://localhost:${PORT}`);
});

db.connect()
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((err) => {
    console.log("Error conectando base de datos: ", err);
  });