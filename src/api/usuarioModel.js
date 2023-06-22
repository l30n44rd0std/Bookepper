const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const BibliotecaPessoalUser = require('./biliotecaPessoalModel');

const Usuario = db.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull:false
    },
    foto: {
        type: DataTypes.LONGBLOB
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'usuario'
});

BibliotecaPessoalUser.belongsTo(Usuario, {
    as: 'usuario',
    foreignKey: 'usuario_id',
});

module.exports = Usuario;
