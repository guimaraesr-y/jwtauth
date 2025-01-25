import { validarJwt } from "../../jwt.js";

export const verificarJwt = (req, res, next) => {
    let token = req.cookies.session;
    validarJwt(token)
        .then(data => {
            req.usuarioData = data;
        })
        .catch(err => {
            req.usuarioData = null;
        })
        .finally(() => next());
}