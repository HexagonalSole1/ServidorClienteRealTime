import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verificarJWT = (req, res, next) => {
  //Consigue el token de la cabecera "Authorization"
  let token = req.get("Authorization");
  if (token) {
    //Se saca la palabra "Bearer", se usa como esquema y se deja el puro token
    token = token.substring(7);
    //Compara el token
    jwt.verify(token, process.env.JWTSECRET, (err, decodeToken) => {
      if (err) {
        return res.status(401).send({
          message: "Token invalido",
          error: err.message,
        });
      }
      req.usuario = decodeToken.usuario;
      next();
    });
  }
  if (!token) {
    return res.status(401).send({ message: "Token inexistente" });
  }
};
