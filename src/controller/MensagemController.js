const Mensagem = require("../model/Mensagem");

module.exports = {
  async readed(req, res) {
    const messages = await Mensagem.getReadMessages(req.params.tituCodigo);
    res.json(messages);
  },

  async notReaded(req, res) {
    const messages = await Mensagem.getNotReadMessage(req.params.tituCodigo);
    res.json(messages);
  },

  async readMessage(req, res) {
    res.json(
      await Mensagem.readMessage(req.body.msgCodigo, req.body.tituCodigo)
    );
  },

  async createMessage(req, res) {
    res.json(
      new Mensagem(
        req.body.msgTitulo,
        req.body.msgDescricao,
        req.body.dataIni,
        req.body.dataFim
      ).save()
    );
  },

  async countMessage(req, res) {
    res.json(await Mensagem.countNotReadMessage(req.params.tituCodigo));
  },
};
