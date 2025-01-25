import express from "express";
import usuarioRouter from "./app/routes/usuarioRouter.js";
import moderadorRouter from "./app/routes/moderadorRouter.js";
import { verificarJwt } from "./app/middlewares/autenticar.js";

const router = express.Router();

router.use(verificarJwt);

// adicionando as rotas
router.get('/', (req, res) => {
    const { usuarioData } = req;
    res.render('index', { usuarioData });
})

router.use("/usuario", usuarioRouter);
router.use("/moderador", moderadorRouter);

export default router;