
import * as chatService from "../services/chat.service.js";



export const getChatsUsuariobyId = (req, res) => {

    const { id } = req.params;
    chatService
      .getChatsUsuario(id)
      .then((response) => {
        res.status(200).json({
          message: "chats obtenido correctamente",
          usuario: response[0],
        });
      })
      .catch((err) => {
        res.status(406).json({
          message: "hubo un error al intentar obtener chats",
          error: err.message,
        });
      });
  };
  
  export const getChatsUsuarioPrivbyId = (req, res) => {

    const { id } = req.params;
    chatService
      .getChatsUsuarioPriv(id)
      .then((response) => {
        res.status(200).json({
          message: "chats obtenido correctamente",
          usuario: response[0],
        });
      })
      .catch((err) => {
        res.status(406).json({
          message: "hubo un error al intentar obtener chats",
          error: err.message,
        });
      });
  };