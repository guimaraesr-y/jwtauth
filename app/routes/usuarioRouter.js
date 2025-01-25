import express from "express";
import usuarioService from "../services/usuarioService.js";
import db from "../models/index.js";

const usuarioRouter = express.Router();

const service = usuarioService(db);

usuarioRouter.get('/', (req, res) => {
    const { usuarioData } = req;
    service.getUserData(usuarioData)
        .then(data => res.render('perfil', { usuarioData: data }))
        .catch(err => res.status(err.status).render('perfil', { err: err.msg }))
})

usuarioRouter.get('/login', (req, res) => {
    res.render('login');
})

usuarioRouter.get('/registrar', (req, res) => {
    res.render('registrar');
})

usuarioRouter.get('/logout', (req, res) => {
    res.clearCookie("session");
    res.redirect("/");
});

usuarioRouter.post('/login', (req, res) => {
    service.login(req.body)
        .then(token => res.cookie("session", token).redirect('/'))
        .catch(err => res.status(err.status).render('login', { err: err.msg }))
})

usuarioRouter.post('/registrar', (req, res) => {
    service.registrar(req.body)
        .then(() => res.redirect('login'))
        .catch((err) => res.status(err.status).render('registrar', { err: err.msg }))
})

export default usuarioRouter;