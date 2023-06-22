const { Sequelize, DataTypes } = require('sequelize');
const db = require('./db');

const BibliotecaPessoalUser = db.define('BibliotecaPessoal', {
    id_usuario: {

    },
    id_livro: {

    },
    livro_lendo: {

    },
    livro_queroLer: {

    },
    livro_abandonado: {
        
    }
})