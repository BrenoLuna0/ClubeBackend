const AgendaConvidado = require("../model/AgendaConvidado");

module.exports = {
  async create(req, res) {
    const agendaConvidado = new AgendaConvidado(
      req.body.agenCodigo,
      req.body.convidados,
      req.body.socio,
      req.body.observacao,
      req.body.dataIncl
    );
    res.send(await agendaConvidado.save());
  },

  async index(req, res) {
    const result = await AgendaConvidado.getDatas(req.params.sociCodigo);
    res.json(result);
  },
};
