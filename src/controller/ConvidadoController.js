const Convidado = require("../model/Convidado");

module.exports = {
  async create(req, res) {
    const qtdConvidados = await Convidado.getConvidadoPorCpf(req.body.cpf);
    if (qtdConvidados === false) return res.status(500).send(false);
    if (qtdConvidados > 0) return res.send(1);
    const convidado = new Convidado(
      req.body.nome,
      req.body.socio,
      req.body.tipo,
      req.body.cpf
    );
    return res.send(await convidado.save());
  },

  async index(req, res) {
    const convidados = await Convidado.getConvidadoPorTitular(
      req.params.sociCodigo
    );
    res.send(convidados);
  },
};
