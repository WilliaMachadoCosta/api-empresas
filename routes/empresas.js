const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresaController');

router.post('/', controller.criarEmpresa);
router.get('/', controller.listarEmpresas);

module.exports = router;
