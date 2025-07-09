const express = require('express');
const router = express.Router();
const controller = require('../controllers/visitaController');

router.post('/', controller.registrarVisita);
router.get('/:id', controller.contarVisitas);

module.exports = router;
