const express = require('express');
const routes = express.Router();

const TitularController = require('./controller/TitularController');
const ConvidadoController = require('./controller/ConvidadoController');
const AgendaController = require('./controller/AgendaController');
const AgendaConvidadoController = require('./controller/AgendaConvidadoController');
const gerarId = require('./services/geradorDeId');


routes.get('/', (req,res)=>{
    res.send('Tudo Certo nada Errado');
});

routes.get('/titular', TitularController.index);
routes.post('/titular', TitularController.login);

routes.get('/convidado/:sociCodigo', ConvidadoController.index);
routes.post('/convidado', ConvidadoController.create);

routes.post('/agenda', AgendaController.create);

routes.post('/agendaConvidado', AgendaConvidadoController.create);

routes.post('/gerarIdConvidado', gerarId);

module.exports = routes;