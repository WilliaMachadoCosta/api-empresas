/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Endpoints para gestão de empresas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Empresa:
 *       type: object
 *       required:
 *         - cnpj
 *         - nome
 *       properties:
 *         cnpj:
 *           type: string
 *           description: CNPJ da empresa
 *         nome:
 *           type: string
 *           description: Nome da empresa
 *         telefone:
 *           type: string
 *           description: Telefone da empresa
 *         sac:
 *           type: string
 *           description: SAC da empresa
 *         televendas:
 *           type: string
 *           description: Televendas da empresa
 *         whatsapp:
 *           type: string
 *           description: WhatsApp da empresa
 *         email:
 *           type: string
 *           description: Email da empresa
 *         site:
 *           type: string
 *           description: Site da empresa
 *         servicos:
 *           type: string
 *           description: Serviços oferecidos
 *         imagem:
 *           type: string
 *           description: URL da imagem da empresa
 *         endereco:
 *           type: object
 *           properties:
 *             cep:
 *               type: string
 *             logradouro:
 *               type: string
 *             numero:
 *               type: string
 *             complemento:
 *               type: string
 *             bairro:
 *               type: string
 *             cidade:
 *               type: string
 *             estado:
 *               type: string
 */

/**
 * @swagger
 * /empresas:
 *   get:
 *     summary: Lista todas as empresas com endereços
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Lista de empresas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Empresa'
 *   post:
 *     summary: Cria uma nova empresa
 *     tags: [Empresas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       201:
 *         description: Empresa criada com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /empresas/{id}:
 *   get:
 *     summary: Busca uma empresa por ID
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Empresa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Empresa'
 *       404:
 *         description: Empresa não encontrada
 *   put:
 *     summary: Atualiza uma empresa
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       200:
 *         description: Empresa atualizada com sucesso
 *       404:
 *         description: Empresa não encontrada
 *   delete:
 *     summary: Deleta uma empresa
 *     tags: [Empresas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da empresa
 *     responses:
 *       200:
 *         description: Empresa deletada com sucesso
 *       404:
 *         description: Empresa não encontrada
 */

/**
 * @swagger
 * /empresas/todas:
 *   get:
 *     summary: Lista todas as empresas (sem endereços)
 *     tags: [Empresas]
 *     responses:
 *       200:
 *         description: Lista de empresas retornada com sucesso
 */

const express = require('express');
const router = express.Router();
const controller = require('../controllers/empresaControllers');

// Rotas CRUD completas
router.post('/', controller.criarEmpresa);
router.get('/', controller.listarEmpresas);
router.get('/todas', controller.listarTodasEmpresas);
router.get('/:id', controller.buscarEmpresaPorId);
router.put('/:id', controller.atualizarEmpresa);
router.delete('/:id', controller.deletarEmpresa);

module.exports = router;
