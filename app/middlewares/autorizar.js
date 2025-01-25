import db from "../models/index.js"

export const autorizar = (funcao) => {
    return (req, res, next) => {
        if(!req.usuarioData){
            return res.redirect('/usuario/login');
        }

        db.Usuarios.findOne({
            where: {
                id: req.usuarioData.id
            },
            include: [{ model: db.Funcoes }]
        }).then(usuario => {
            const funcoes = usuario.Funcoes.map(funcao => funcao.nome);
            if (funcoes.includes(funcao)) {
                next();
            } else {
                res.status(401).end("Você não pode acessar esta página!");
            }
        })

        
    }
}