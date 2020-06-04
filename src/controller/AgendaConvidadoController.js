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
};
