import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import authSocket from "../socket.io/auth.middlware.js"



function ConectarSocket(servidor){
      const server = servidor;
      const PORT = process.env.PORT || 3001;


    const io = new Server(server, {
        cors: {
          origin: "*",
          methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
        },
      });
      io.use(authSocket)

    
      
    io.on('connection', (socket) => {
        console.log('usuario conectado');
      
      
        socket.emit('mensaje', '¡Bienvenido! Estás conectado.');
      
      
        socket.on("join room", (roomNumber) => {
          const roomName = `Room ${roomNumber}`;
          socket.join(roomName);
          console.log(`Usuario se unió a ${roomName}`);
        });
      
      
        socket.on("chat message", (msg, roomNumber,remitente) => {
          const roomName = `Room ${roomNumber}`;
          io.to(roomName).emit("chat message", {msg,roomName,remitente});
          console.log(`Mensaje en ${roomName}: ${msg}`);
        });
      });

}

export default ConectarSocket;
