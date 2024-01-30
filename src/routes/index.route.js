import { Router } from "express";

import usuariosRouter from "./usuarios.route.js";
import chatRouter from "./chat.route.js"


const indexRouter = Router();
const prefijo = "/api";

indexRouter.get(prefijo, (req, res) => {
  res.send("Bienvenido a mi API").status(200);
});


indexRouter.use(`${prefijo}/usuarios`, usuariosRouter);
indexRouter.use(`${prefijo}/chats`, chatRouter);


export default indexRouter;
