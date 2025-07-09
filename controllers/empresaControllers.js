const empresaRepo = require('../repositories/empresaRepository');
const enderecoRepo = require('../repositories/enderecoRepository');

exports.criarEmpresa = async (req, res) => {
  const { endereco, ...empresa } = req.body;

  try {
    const empresaId = await empresaRepo.criar(empresa);
    await enderecoRepo.criar(empresaId, endereco);
    res.status(201).json({ id: empresaId });
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
    res.status(500).json({ erro: 'Erro ao listar empresas' });
  }
};
