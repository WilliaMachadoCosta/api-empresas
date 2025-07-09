const db = require('../db');

exports.criar = async (empresaId, endereco) => {
  const { cep, logradouro, numero, complemento, bairro, cidade, estado } = endereco;
  await db.query(
    `INSERT INTO endereco (empresa_id, cep, logradouro, numero, complemento, bairro, cidade, estado)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
    [empresaId, cep, logradouro, numero, complemento, bairro, cidade, estado]
  );
};

exports.atualizar = async (empresaId, endereco) => {
  const { cep, logradouro, numero, complemento, bairro, cidade, estado } = endereco;
  await db.query(
    `UPDATE endereco 
     SET cep = $1, logradouro = $2, numero = $3, complemento = $4, 
         bairro = $5, cidade = $6, estado = $7
     WHERE empresa_id = $8`,
    [cep, logradouro, numero, complemento, bairro, cidade, estado, empresaId]
  );
};

exports.deletar = async (empresaId) => {
  await db.query('DELETE FROM endereco WHERE empresa_id = $1', [empresaId]);
};
