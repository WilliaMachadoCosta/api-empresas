/**
 * @swagger
 * tags:
 *   name: Visitas
 *   description: Endpoints para gestão de visitas
 */

/**
 * @swagger
 * /visitas:
 *   get:
 *     summary: Lista todas as visitas
 *     tags: [Visitas]
 *     responses:
 *       200:
 *         description: Lista de visitas retornada com sucesso
 */
const express = require('express');
const router = express.Router();
const controller = require('../controllers/visitaController');

router.post('/', controller.registrarVisita);
router.get('/:id', controller.contarVisitas);

module.exports = router;
