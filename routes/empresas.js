/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Endpoints para gestão de empresas
 */

/**
 * @swagger
 * /empresas:
 *   get:
 *     summary: Lista todas as empresas
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Lista de empresas retornada com sucesso
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresaController');

router.post('/', controller.criarEmpresa);
router.get('/', controller.listarEmpresas);

module.exports = router;
