const visitaRepo = require('../repositories/visitaRepository');

exports.registrarVisita = async (req, res) => {
  const { empresa_id, ip, origem } = req.body;

  try {
    await visitaRepo.criar(empresa_id, ip, origem);
    res.status(201).json({ message: 'Visita registrada com sucesso' });
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
    console.error(err);
    res.status(500).json({ erro: 'Erro ao contar visitas' });
  }
};

exports.buscarVisitaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const visita = await visitaRepo.buscarPorId(id);
    if (!visita) {
      return res.status(404).json({ erro: 'Visita não encontrada' });
    }
    res.json(visita);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar visita' });
  }
};

exports.atualizarVisita = async (req, res) => {
  const { id } = req.params;
  const { empresa_id, ip, origem } = req.body;

  try {
    const visitaExistente = await visitaRepo.buscarPorId(id);
    if (!visitaExistente) {
      return res.status(404).json({ erro: 'Visita não encontrada' });
    }

    const visitaAtualizada = await visitaRepo.atualizar(id, { empresa_id, ip, origem });
    res.json({ 
      message: 'Visita atualizada com sucesso', 
      visita: visitaAtualizada 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar visita' });
  }
};

exports.deletarVisita = async (req, res) => {
  const { id } = req.params;

  try {
    const visitaExistente = await visitaRepo.buscarPorId(id);
    if (!visitaExistente) {
      return res.status(404).json({ erro: 'Visita não encontrada' });
    }

    await visitaRepo.deletar(id);
    res.json({ message: 'Visita deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar visita' });
  }
};

exports.listarTodasVisitas = async (req, res) => {
  try {
    const visitas = await visitaRepo.listarTodos();
    res.json(visitas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar visitas' });
  }
};

exports.buscarVisitasPorEmpresa = async (req, res) => {
  const { empresaId } = req.params;

  try {
    const visitas = await visitaRepo.buscarPorEmpresa(empresaId);
    res.json(visitas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar visitas da empresa' });
  }
};
