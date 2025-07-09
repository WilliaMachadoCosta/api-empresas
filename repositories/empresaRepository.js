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
