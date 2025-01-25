import { gerarToken } from "../../jwt.js";

export default (db) => {
    return {
        getUserData: ({ id }) => {
            return db.Usuarios.findOne({
                where: { id },
                include: [{ model: db.Funcoes }]
            });
        },
        
        login: ({ usuario, senha }) => {
            return new Promise((resolve, reject) => {
                db.Usuarios.findOne({
                    where: { usuario, senha }
                }).then((usuario) => {
                    if(usuario === null) reject({ msg: "Usuário ou senha inválidos", status: 401 });
                    resolve(gerarToken(usuario.dataValues));
                }).catch(err => {
                    reject({ msg: "Um erro inesperado ocorreu!", status: 500 });
                })
            })
        },
        
        registrar: ({ nome, usuario, senha }) => {
            return new Promise((resolve, reject) => {
                db.Usuarios.create({
                    nome,
                    usuario,
                    senha
                })
                .then(usuario => {
                    db.Funcoes.findOne({
                        where: { nome: 'usuario' }
                    }).then(funcao => usuario.addFuncoes(funcao))
                    resolve();
                })
                .catch(err => {
                    if(err.name === "SequelizeUniqueConstraintError") 
                    reject({ msg: "Usuário já cadastrado", status: 409 });
                    reject({ msg: err, status: 500 })
                })
            })
        },
        
        editar: ({ id, nome, usuario, senha }) => {
            db.Usuarios.update({ 
                nome, 
                usuario, 
                senha 
            }, { 
                where: { id } 
            });
        },
        
        
        deletar: ({ id }) => {
            db.Usuarios.destroy({
                where: { id }
            })
        },
    }
};
