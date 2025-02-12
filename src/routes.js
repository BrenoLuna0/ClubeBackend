const express = require("express");
const routes = express.Router();

const TitularController = require("./controller/TitularController");
const ConvidadoController = require("./controller/ConvidadoController");
const AgendaController = require("./controller/AgendaController");
const AgendaConvidadoController = require("./controller/AgendaConvidadoController");
const MensagemController = require("./controller/MensagemController");
const auth = require("./services/auth");

routes.get("/", (req, res) => {
  res.send(
    "Seu sorriso é tão resplandecente que deixou meu coração alegre, me dê a mão pra fugir dessa terrível escuridão"
  );
});

routes.get("/titular", auth, TitularController.index);
routes.put("/titular/:codigo", auth, TitularController.updatePassword);
routes.post("/titular", TitularController.login);

routes.get("/convidado/:sociCodigo", auth, ConvidadoController.index);
routes.get(
  "/convidado/:sociCodigo/:data",
  auth,
  ConvidadoController.schedulled
);
routes.post("/convidado", auth, ConvidadoController.create);
routes.delete("/convidado/:convCodigo", auth, ConvidadoController.delete);

routes.get("/agenda/:sociCodigo", auth, AgendaController.index);
routes.post("/agenda", auth, AgendaController.create);
routes.put("/agenda/:agenCodigo", auth, AgendaController.update);
routes.delete("/agenda/:agenCodigo", auth, AgendaController.delete);

routes.post("/agendaConvidado", auth, AgendaConvidadoController.create);
routes.get(
  "/agendaConvidado/:sociCodigo",
  auth,
  AgendaConvidadoController.index
);

routes.post("/mensagem", auth, MensagemController.createMessage);
routes.post("/lerMensagem", auth, MensagemController.readMessage);
routes.get("/mensagemLida/:tituCodigo", auth, MensagemController.readed);
routes.get("/mensagemNaoLida/:tituCodigo", auth, MensagemController.notReaded);
routes.get(
  "/contarMensagem/:tituCodigo",
  auth,
  MensagemController.countMessage
);

module.exports = routes;
