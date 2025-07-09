const db = require('../db');

exports.criar = async (empresaId, endereco) => {
  const { cep, logradouro, numero, complemento, bairro, cidade, estado } = endereco;
  await db.query(
    `INSERT INTO endereco (empresa_id, cep, logradouro, numero, complemento, bairro, cidade, estado)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [empresaId, cep, logradouro, numero, complemento, bairro, cidade, estado]
  );
};
