const { Sequelize } = require('sequelize');

const dbSequelize = new Sequelize( 'usuario', 'aluno.ifal', 'aluno.ifal', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = dbSequelize;