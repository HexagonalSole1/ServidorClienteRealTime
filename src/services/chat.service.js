import db from "../config/db.js";



export const getChatsUsuario = (usuarioId) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT *
      FROM chat
      WHERE idChat IN (
        SELECT idChat
        FROM \`usuario-chat\`   -- Aquí utilizamos backticks para el nombre de la tabla
        WHERE usuarioId = ?
      );
    `;
  
      db.execute(query,[usuarioId])
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  export const getChatsUsuarioPriv = (usuarioId) => {
    return new Promise((resolve, reject) => {
      const query = `
     
SELECT u.usuarioId, u.correo, u.contrasena, u.logo, u.ultimaConexion, u.nombre, u.ws
FROM usuario u
JOIN chatpriv c ON (u.usuarioId = c.usuarioId1 OR u.usuarioId = c.usuarioId2)
WHERE (c.usuarioId1 = ? OR c.usuarioId2 = ?) AND u.usuarioId != ?;
    `;
  
      db.execute(query,[usuarioId,usuarioId,usuarioId])
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  
  