const Agenda = require("../model/Agenda");

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
};
