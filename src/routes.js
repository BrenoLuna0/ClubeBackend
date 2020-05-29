const express = require('express');
const routes = express.Router();

const TitularController = require('./controller/TitularController');
const ConvidadoController = require('./controller/ConvidadoController');
const AgendaController = require('./controller/AgendaController');
const AgendaConvidadoController = require('./controller/AgendaConvidadoController');
const auth = require('./services/auth');
const gerarId = require('./services/geradorDeId');


routes.get('/', (req,res)=>{
    res.send('Tudo Certo nada Errado');
});

routes.get('/titular', auth, TitularController.index);
routes.post('/titular', TitularController.login);

routes.get('/convidado/:sociCodigo', auth, ConvidadoController.index);
routes.post('/convidado', auth, ConvidadoController.create);

routes.post('/agenda', auth, AgendaController.create);

routes.post('/agendaConvidado', auth, AgendaConvidadoController.create);

routes.get('/gerarIdConvidado', auth, gerarId.gerarId);
routes.get('/gerarIdAgenda', auth, gerarId.gerarIdAgenda);

module.exports = routes;