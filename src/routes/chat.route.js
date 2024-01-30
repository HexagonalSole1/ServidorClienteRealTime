import { Router } from "express";
import { verificarJWT } from "../middlewares/auth/auth.middleware.js";
import * as chatsController from "../controllers/chat.controller.js";


const chatRouter = Router();

chatRouter.get("/:id",chatsController.getChatsUsuariobyId)
chatRouter.get("/priv/:id",chatsController.getChatsUsuarioPrivbyId)




export default chatRouter;