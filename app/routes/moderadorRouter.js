import express from "express";
import moderadorService from "../services/moderadorService.js";
import { autorizar } from "../middlewares/autorizar.js";
import db from "../models/index.js";

const moderadorRouter = express.Router();
const service = moderadorService(db);

moderadorRouter.use(autorizar("moderador"));

moderadorRouter.get('/', (req, res) => {
    service.getUsuarios()
        .then(data => res.render('moderador', { usuariosData: data }))
        .catch(err => res.status(err.status).render('moderador', { err: err.msg }))
})

moderadorRouter.post('/editar/:id', (req, res) => {
    service.editar(req.body)
        .then(() => res.redirect('/moderador'))
        .catch(err => res.status(err.status).render('moderador', { err: err.msg }))
})

moderadorRouter.post('/deletar/:id', (req, res) => {
    service.deletar(req.params)
        .then(() => res.redirect('/moderador'))
        .catch(err => res.status(err.status).render('moderador', { err: err.msg }))
})

moderadorRouter.post('/tornar/:id', (req, res) => {
    service.tornarModerador(req.params)
        .then(() => res.redirect('/moderador'))
        .catch(err => res.status(err.status).render('moderador', { err: err.msg }))
})

export default moderadorRouter;