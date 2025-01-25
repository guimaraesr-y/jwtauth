import { Sequelize } from 'sequelize';
import usuarios from './usuarios.js';
import funcoes from './funcoes.js';
import config from '../../config.js';

const { 
    dbHost,
    dbPort,
    dbName,
    dbUser,
    dbPass
} = config.database;

const sequelize = new Sequelize({
    host: dbHost,
    port: dbPort,
    database: dbName,
    username: dbUser,
    password: dbPass,
    dialect: 'mysql',
    logging: false // faz o sequelize parar de logar queries
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Usuarios = usuarios(sequelize, Sequelize);
db.Funcoes = funcoes(sequelize, Sequelize);

db.Usuarios.belongsToMany(db.Funcoes, {
    through: 'FuncaoUsuario',
    foreignKey: 'usuarioId',
})

db.Funcoes.belongsToMany(db.Usuarios, {
    through: 'FuncaoUsuario',
    foreignKey: 'funcaoId',
})

sequelize.sync({ force: false })
    .then(() => {
        db.Funcoes.findOrCreate({
            where: { nome: 'moderador' }
        })
        
        db.Funcoes.findOrCreate({
            where: { nome: 'usuario' }
        })

        db.Usuarios.findOrCreate({
            where: {
                nome: 'Administrador',
                usuario: 'admin',
                senha: 'admin'
            }
        }).then(async usuario => { 
            let funcaoModerador = await db.Funcoes.findOne({ where: { nome: 'moderador' } })
            let funcaoUsuario = await db.Funcoes.findOne({ where: { nome: 'usuario' } })
        
            usuario[0].addFuncoes(funcaoModerador);
            usuario[0].addFuncoes(funcaoUsuario);
        })
    })

export default db;
