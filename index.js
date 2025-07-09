const express = require('express');
const cors = require('cors');
require('dotenv').config();

const empresasRoutes = require('./routes/empresas');
const visitasRoutes = require('./routes/visitas');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/empresas', empresasRoutes);
app.use('/visitas', visitasRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API rodando na porta ${port}`));
