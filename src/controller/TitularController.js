const Titular = require("../model/Titular");

module.exports = {
  async index(req, res) {
    const titulares = await Titular.getTitulares();
    res.send(titulares);
  },

  async login(req, res) {
    const titular = await Titular.login(req.body.codigo, req.body.senha);
    res.send(titular);
  },

  async updatePassword(req, res) {
    const titular = await Titular.changePassword(
      req.params.codigo,
      req.body.newPass,
      req.body.oldPass
    );
    return res.json(titular);
  },
};
