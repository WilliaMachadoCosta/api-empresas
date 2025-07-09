/**
 * @swagger
 * tags:
 *   name: Visitas
 *   description: Endpoints para gestão de visitas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Visita:
 *       type: object
 *       required:
 *         - empresa_id
 *         - ip
 *         - origem
 *       properties:
 *         empresa_id:
 *           type: integer
 *           description: ID da empresa visitada
 *         ip:
 *           type: string
 *           description: IP do visitante
 *         origem:
 *           type: string
 *           description: Origem da visita
 *         data_visita:
 *           type: string
 *           format: date-time
 *           description: Data e hora da visita
 *         empresa_nome:
 *           type: string
 *           description: Nome da empresa visitada
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Visita'
 *   post:
 *     summary: Registra uma nova visita
 *     tags: [Visitas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - empresa_id
 *               - ip
 *               - origem
 *             properties:
 *               empresa_id:
 *                 type: integer
 *               ip:
 *                 type: string
 *               origem:
 *                 type: string
 *     responses:
 *       201:
 *         description: Visita registrada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /visitas/{id}:
 *   get:
 *     summary: Busca uma visita por ID
 *     tags: [Visitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da visita
 *     responses:
 *       200:
 *         description: Visita encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Visita'
 *       404:
 *         description: Visita não encontrada
 *   put:
 *     summary: Atualiza uma visita
 *     tags: [Visitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da visita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Visita'
 *     responses:
 *       200:
 *         description: Visita atualizada com sucesso
 *       404:
 *         description: Visita não encontrada
 *   delete:
 *     summary: Deleta uma visita
 *     tags: [Visitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da visita
 *     responses:
 *       200:
 *         description: Visita deletada com sucesso
 *       404:
 *         description: Visita não encontrada
 */

/**
 * @swagger
 * /visitas/empresa/{empresaId}:
 *   get:
 *     summary: Lista visitas de uma empresa específica
 *     tags: [Visitas]
 *     parameters:
 *       - in: path
 *         name: empresaId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Lista de visitas da empresa
 */

/**
 * @swagger
 * /visitas/contar/{id}:
 *   get:
 *     summary: Conta visitas de uma empresa
 *     tags: [Visitas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Total de visitas da empresa
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/visitaController');

// Rotas CRUD completas
router.post('/', controller.registrarVisita);
router.get('/', controller.listarTodasVisitas);
router.get('/:id', controller.buscarVisitaPorId);
router.put('/:id', controller.atualizarVisita);
router.delete('/:id', controller.deletarVisita);

// Rotas específicas
router.get('/empresa/:empresaId', controller.buscarVisitasPorEmpresa);
router.get('/contar/:id', controller.contarVisitas);

module.exports = router;
