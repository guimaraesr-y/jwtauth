export default function(sequelize, DataTypes) {
    const Funcoes = sequelize.define('Funcoes', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    });
    
    return Funcoes;
};