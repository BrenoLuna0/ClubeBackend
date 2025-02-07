const Agenda = require("../model/Agenda");
const { update } = require("../pgConnection");

module.exports = {
  async create(req, res) {
    const agenda = new Agenda(
      req.body.data,
      req.body.diaSemana,
      req.body.qtdConvidado,
      req.body.dataIncl
    );
    res.send(await agenda.save());
  },

  async update(req, res) {
    const result = await Agenda.update(
      req.params.agenCodigo,
      req.body.convidados,
      req.body.sociCodigo
    );
    res.send(result);
  },

  async delete(req, res) {
    res.send(await Agenda.delete(req.params.agenCodigo));
  },

  async index(req, res) {
    res.send(await Agenda.index(req.params.sociCodigo));
  },
};
