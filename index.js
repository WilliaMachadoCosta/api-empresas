const express = require('express');
const cors = require('cors');
require('dotenv').config();

const empresasRoutes = require('./routes/empresas');
const visitasRoutes = require('./routes/visitas');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/empresas', empresasRoutes);
app.use('/visitas', visitasRoutes);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Empresas',
      version: '1.0.0',
      description: 'Documentação da API de Empresas',
    },
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API rodando na porta ${port}`));