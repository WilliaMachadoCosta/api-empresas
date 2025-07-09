const db = require('../db');

exports.criar = async (empresa) => {
  const { cnpj, nome, telefone, sac, televendas, whatsapp, email, site, servicos, imagem } = empresa;
  const result = await db.query(
    `INSERT INTO empresa (cnpj, nome, telefone, sac, televendas, whatsapp, email, site, servicos, imagem)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
    [cnpj, nome, telefone, sac, televendas, whatsapp, email, site, servicos, imagem]
  );
  return result.rows[0].id;
};

exports.listarComEndereco = async () => {
  const result = await db.query(`
    SELECT e.*, json_build_object(
      'cep', en.cep,
      'logradouro', en.logradouro,
      'numero', en.numero,
      'complemento', en.complemento,
      'bairro', en.bairro,
      'cidade', en.cidade,
      'estado', en.estado
    ) AS endereco
    FROM empresa e
    LEFT JOIN endereco en ON en.empresa_id = e.id
  `);
  return result.rows;
};

exports.buscarPorId = async (id) => {
  const result = await db.query(`
    SELECT e.*, json_build_object(
      'cep', en.cep,
      'logradouro', en.logradouro,
      'numero', en.numero,
      'complemento', en.complemento,
      'bairro', en.bairro,
      'cidade', en.cidade,
      'estado', en.estado
    ) AS endereco
    FROM empresa e
    LEFT JOIN endereco en ON en.empresa_id = e.id
    WHERE e.id = $1
  `, [id]);
  return result.rows[0];
};

exports.atualizar = async (id, empresa) => {
  const { cnpj, nome, telefone, sac, televendas, whatsapp, email, site, servicos, imagem } = empresa;
  const result = await db.query(
    `UPDATE empresa 
     SET cnpj = $1, nome = $2, telefone = $3, sac = $4, televendas = $5, 
         whatsapp = $6, email = $7, site = $8, servicos = $9, imagem = $10
     WHERE id = $11 RETURNING *`,
    [cnpj, nome, telefone, sac, televendas, whatsapp, email, site, servicos, imagem, id]
  );
  return result.rows[0];
};

exports.deletar = async (id) => {
  await db.query('DELETE FROM empresa WHERE id = $1', [id]);
};

exports.listarTodos = async () => {
  const result = await db.query('SELECT * FROM empresa ORDER BY nome');
  return result.rows;
};
