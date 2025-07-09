const visitaRepo = require('../repositories/visitaRepository');

exports.registrarVisita = async (req, res) => {
  const { empresa_id, ip, origem } = req.body;

  try {
    await visitaRepo.criar(empresa_id, ip, origem);
    res.status(201).json({ sucesso: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao registrar visita' });
  }
};

exports.contarVisitas = async (req, res) => {
  const { id } = req.params;

  try {
    const total = await visitaRepo.contarPorEmpresa(id);
    res.json({ empresa_id: id, total });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao contar visitas' });
  }
};
