# API Empresas

API REST para gestão de empresas e visitas com documentação Swagger.

## 🚀 Configuração

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados PostgreSQL

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Configuração do Banco de Dados
DATABASE_URL=postgresql://username:password@localhost:5432/api_empresas

# OU configure individualmente:
DB_USER=postgres
DB_HOST=localhost
DB_NAME=api_empresas
DB_PASSWORD=sua_senha
DB_PORT=5432

# Configuração da API
PORT=3000
NODE_ENV=development
```

### 3. Criar banco de dados

```sql
CREATE DATABASE api_empresas;
```

### 4. Executar a aplicação

```bash
npm run dev
```

## 📚 Documentação da API

Acesse a documentação Swagger em: `http://localhost:3000/api-docs`

## 🛠️ Endpoints

### Empresas
- `GET /empresas` - Listar todas as empresas
- `POST /empresas` - Criar empresa
- `GET /empresas/:id` - Buscar empresa por ID
- `PUT /empresas/:id` - Atualizar empresa
- `DELETE /empresas/:id` - Deletar empresa
- `GET /empresas/todas` - Listar empresas (sem endereços)

### Visitas
- `GET /visitas` - Listar todas as visitas
- `POST /visitas` - Registrar visita
- `GET /visitas/:id` - Buscar visita por ID
- `PUT /visitas/:id` - Atualizar visita
- `DELETE /visitas/:id` - Deletar visita
- `GET /visitas/empresa/:empresaId` - Visitas de uma empresa
- `GET /visitas/contar/:id` - Contar visitas de uma empresa

## 🗄️ Estrutura do Banco

### Tabela: empresa
- id (SERIAL PRIMARY KEY)
- cnpj (VARCHAR)
- nome (VARCHAR)
- telefone (VARCHAR)
- sac (VARCHAR)
- televendas (VARCHAR)
- whatsapp (VARCHAR)
- email (VARCHAR)
- site (VARCHAR)
- servicos (TEXT)
- imagem (VARCHAR)

### Tabela: endereco
- id (SERIAL PRIMARY KEY)
- empresa_id (INTEGER REFERENCES empresa(id))
- cep (VARCHAR)
- logradouro (VARCHAR)
- numero (VARCHAR)
- complemento (VARCHAR)
- bairro (VARCHAR)
- cidade (VARCHAR)
- estado (VARCHAR)

### Tabela: visita
- id (SERIAL PRIMARY KEY)
- empresa_id (INTEGER REFERENCES empresa(id))
- ip (VARCHAR)
- origem (VARCHAR)
- data_visita (TIMESTAMP DEFAULT NOW()) 