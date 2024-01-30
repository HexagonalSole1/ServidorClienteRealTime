import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as usuariosService from "../services/usuarios.service.js";

const jwtToken = process.env.JWTSECRET||"HexagonalSole";

export const login = (req, res) => {
  const { correo, contrasena } = req.body;
  usuariosService
    .getUsuarioByEmail(correo)
    .then(async (resolve) => {
      if (resolve[0][0].length == 0) {
        return res.status(400).json({
          message: "email o password incorrecto",
        });
      }
      const passwordCorrecto = bcrypt.compareSync(
        contrasena,
        resolve[0][0].contrasena
      );
      if (!passwordCorrecto) {
        return res.status(400).json({
          message: "email o password incorrecto",
        });
      }
      const payload = await {
        usuario: {
          id: resolve[0][0].usuarioId,
          nombre: resolve[0][0].nombre,
          logo: resolve[0][0].logo,

        },
      };
      const token = jwt.sign(payload, jwtToken, { expiresIn: "100h" });

      res.status(200).json({
        message: "acceso correcto",
        
        usuario: {
          id: resolve[0][0].usuarioId,
          nombre: resolve[0][0].nombre,
          logo: resolve[0][0].logo,
          token,
          ws:resolve[0][0].ws


         

        },
      });
    })
    .catch((err) => {
      return res.status(500).json({
        message: "ocurrió un error al validar credenciales",
        error: err.message,
      });
    });
};
