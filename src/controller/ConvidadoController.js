const Convidado = require("../model/Convidado");

module.exports = {
  async create(req, res) {
    const convidado = new Convidado(
      req.body.nome,
      req.body.socio,
      req.body.tipo,
      req.body.cpf
    );
    res.send(await convidado.save());
  },

  async index(req, res) {
    const convidados = await Convidado.getConvidadoPorTitular(
      req.params.sociCodigo
    );
    res.send(convidados);
  },
};
