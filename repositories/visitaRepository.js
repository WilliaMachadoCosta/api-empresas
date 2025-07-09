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
