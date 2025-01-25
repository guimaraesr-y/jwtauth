export default (db) => {
    return {
        getUsuarios() {
            return new Promise((resolve, reject) => {
                db.Usuarios.findAll({ include: [{ model: db.Funcoes }] })
                    .then(data => data.map(u => u.dataValues))
                    .then(data => resolve(data))
                    .catch(err => reject({ msg: err.msg, status: 500 }))
            })
        },

        editar({ id, nome, usuario, senha }) {
            return new Promise((resolve, reject) => {
                db.Usuarios.update({
                    nome,
                    usuario,
                    senha
                }, {
                    where: { id }
                })
                    .then(() => resolve())
                    .catch(err => reject({ msg: "Um erro inesperado ocorreu!", status: 500 }))
            })
        },

        deletar({ id }) {
            return new Promise((resolve, reject) => {
                db.Usuarios.destroy({
                    where: { id }
                })
                    .then(() => resolve())
                    .catch(err => reject({ msg: "Um erro inesperado ocorreu!", status: 500 }))
            })
        }
    }
}