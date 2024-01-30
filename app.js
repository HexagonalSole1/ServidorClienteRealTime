import express from "express";
import db from "./src/config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "http";
import ConectarSocket from "./src/middlewares/socket.io/socket.js"
import indexRouter from "./src/routes/index.route.js";
import  startWebSocketServer from './src/middlewares/websocket/webSocket.js'
import { verificarJWT }  from "./src/middlewares/auth/auth.middleware.js"


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

//rutas
app.use("/",indexRouter)




const notificaciones = [
  { id: 1, cuerpo: "te han asignado una nueva actividad" },
  { id: 2, cuerpo: "te eliminaron de un proyecto" }
];

app.get('/notificaciones', (req, res) => {

  return res.status(200).json({
      success: true,
      notificaciones
  });
});

app.post('/notificaciones', (req, res) => {
  const idNotificacion = notificaciones.length > 0 ? notificaciones[notificaciones.length - 1].id + 1 : 1;

  const notificacion = {
    id: idNotificacion,
    cuerpo: req.body.cuerpo
  }

  notificaciones.push(notificacion);

  return res.status(201).json({
      success: true,
      message: "notificación registrada"
  });
})

// /notificaciones/update?idNotificacion=2
app.get('/notificaciones/update', (req, res) => {
  const idNotificacion = parseInt(req.query.idNotificacion, 10);
  const notificacionesNuevas = notificaciones.filter(notificacion => notificacion.id > idNotificacion);

  return res.status(200).json({
      success: true,
      notificaciones: notificacionesNuevas
  });
});



const listaActualizaciones = [
  {id: 1, actualizacion: "12.2"}, // 0
  {id: 2, actualizacion: "12.3"} // 1
]

let resClientesActualizaciones = [];

app.get('/actualizaciones', (req, res) => {
  res.status(200).json({
      success: true,
      actualizaciones: listaActualizaciones
  });
});

app.get('/nueva-actualizacion', (req, res) => {
  resClientesActualizaciones.push(res);

  req.on('close', () => {
      const index = resClientesActualizaciones.indexOf(res);
      if (index !== -1) {
          resClientesActualizaciones.splice(index, 1);
      }
  });
});

app.post('/actualizaciones', (req, res) => {
  let idActualizacion = listaActualizaciones.length > 0 ? listaActualizaciones[listaActualizaciones.length - 1].id + 1 : 1;

  const nuevaActualizacion = {
      id: idActualizacion,
      actualizacion: req.body.actualizacion
  };

  listaActualizaciones.push(nuevaActualizacion);

  // Responder a los clientes conectados
  responderClientesActualizaciones(nuevaActualizacion);

  res.status(201).json({
      success: true,
      message: "Actualización creada"
  });
});

function responderClientesActualizaciones(nuevaActualizacion) {
  for (let i = 0; i < resClientesActualizaciones.length; i++) {
    const res = resClientesActualizaciones[i];
    try {
      res.status(200).json({
        success: true,
        nuevaActualizacion
      });
    } catch (error) {
      console.error('Error al enviar actualización al cliente:', error.message);
    }
  }
  // Limpia la lista de clientes después de enviar a todos los clientes
  resClientesActualizaciones = [];
}








const PORT = process.env.PORT || 3001;


const server = createServer(app);

ConectarSocket(server);
startWebSocketServer()

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