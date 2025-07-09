const empresaRepo = require('../repositories/empresaRepository');
const enderecoRepo = require('../repositories/enderecoRepository');

exports.criarEmpresa = async (req, res) => {
  const { endereco, ...empresa } = req.body;

  try {
    const empresaId = await empresaRepo.criar(empresa);
    if (endereco) {
      await enderecoRepo.criar(empresaId, endereco);
    }
    res.status(201).json({ id: empresaId, message: 'Empresa criada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar empresa' });
  }
};

exports.listarEmpresas = async (req, res) => {
  try {
    const empresas = await empresaRepo.listarComEndereco();
    res.json(empresas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar empresas' });
  }
};

exports.buscarEmpresaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const empresa = await empresaRepo.buscarPorId(id);
    if (!empresa) {
      return res.status(404).json({ erro: 'Empresa não encontrada' });
    }
    res.json(empresa);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar empresa' });
  }
};

exports.atualizarEmpresa = async (req, res) => {
  const { id } = req.params;
  const { endereco, ...empresa } = req.body;

  try {
    const empresaExistente = await empresaRepo.buscarPorId(id);
    if (!empresaExistente) {
      return res.status(404).json({ erro: 'Empresa não encontrada' });
    }

    const empresaAtualizada = await empresaRepo.atualizar(id, empresa);
    
    if (endereco) {
      await enderecoRepo.atualizar(id, endereco);
    }

    res.json({ 
      message: 'Empresa atualizada com sucesso', 
      empresa: empresaAtualizada 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar empresa' });
  }
};

exports.deletarEmpresa = async (req, res) => {
  const { id } = req.params;

  try {
    const empresaExistente = await empresaRepo.buscarPorId(id);
    if (!empresaExistente) {
      return res.status(404).json({ erro: 'Empresa não encontrada' });
    }

    await enderecoRepo.deletar(id);
    await empresaRepo.deletar(id);
    
    res.json({ message: 'Empresa deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar empresa' });
  }
};

exports.listarTodasEmpresas = async (req, res) => {
  try {
    const empresas = await empresaRepo.listarTodos();
    res.json(empresas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar empresas' });
  }
};
