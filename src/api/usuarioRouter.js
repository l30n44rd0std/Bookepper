const express = require('express');

const Usuario = require('./usuarioModel');
const BibliotecaPessoalUser = require('./biliotecaPessoalModel');

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
})