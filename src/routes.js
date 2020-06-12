const express = require("express");
const routes = express.Router();

const TitularController = require("./controller/TitularController");
const ConvidadoController = require("./controller/ConvidadoController");
const AgendaController = require("./controller/AgendaController");
const AgendaConvidadoController = require("./controller/AgendaConvidadoController");
const auth = require("./services/auth");

routes.get("/", (req, res) => {
  res.send(
    "Seu sorriso é tão resplandecente que deixou meu coração alegre, me dê a mão pra fugir dessa terrível escuridão"
  );
});

routes.get("/titular", auth, TitularController.index);
routes.post("/titular", TitularController.login);

routes.get("/convidado/:sociCodigo", auth, ConvidadoController.index);
routes.post("/convidado", auth, ConvidadoController.create);

routes.post("/agenda", auth, AgendaController.create);

routes.post("/agendaConvidado", auth, AgendaConvidadoController.create);
routes.get(
  "/agendaConvidado/:sociCodigo",
  auth,
  AgendaConvidadoController.index
);
module.exports = routes;
