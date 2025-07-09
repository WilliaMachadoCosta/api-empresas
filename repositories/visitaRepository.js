const db = require('../db');

exports.criar = async (empresaId, ip, origem) => {
  await db.query(
    `INSERT INTO visita (empresa_id, ip, origem)
     VALUES ($1, $2, $3)`,
    [empresaId, ip, origem]
  );
};

exports.contarPorEmpresa = async (empresaId) => {
  const result = await db.query(
    `SELECT COUNT(*) FROM visita WHERE empresa_id = $1`,
    [empresaId]
  );
  return parseInt(result.rows[0].count, 10);
};

exports.buscarPorId = async (id) => {
  const result = await db.query(
    `SELECT v.*, e.nome as empresa_nome 
     FROM visita v 
     LEFT JOIN empresa e ON v.empresa_id = e.id 
     WHERE v.id = $1`,
    [id]
  );
  return result.rows[0];
};

exports.atualizar = async (id, visita) => {
  const { empresa_id, ip, origem } = visita;
  const result = await db.query(
    `UPDATE visita 
     SET empresa_id = $1, ip = $2, origem = $3, data_visita = NOW()
     WHERE id = $4 RETURNING *`,
    [empresa_id, ip, origem, id]
  );
  return result.rows[0];
};

exports.deletar = async (id) => {
  await db.query('DELETE FROM visita WHERE id = $1', [id]);
};

exports.listarTodos = async () => {
  const result = await db.query(
    `SELECT v.*, e.nome as empresa_nome 
     FROM visita v 
     LEFT JOIN empresa e ON v.empresa_id = e.id 
     ORDER BY v.data_visita DESC`
  );
  return result.rows;
};

exports.buscarPorEmpresa = async (empresaId) => {
  const result = await db.query(
    `SELECT v.*, e.nome as empresa_nome 
     FROM visita v 
     LEFT JOIN empresa e ON v.empresa_id = e.id 
     WHERE v.empresa_id = $1 
     ORDER BY v.data_visita DESC`,
    [empresaId]
  );
  return result.rows;
};
