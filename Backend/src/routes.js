const express = require('express');

const ongController = require('./controllers/OngController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');

const routes = express.Router();

routes.post('/Users',(request, response)=>{
    const queryParams = request.query;
    const routeParams = request.params;
    const bodyParams = request.body;
    console.log(bodyParams);
    let resposta = response.json({
        nome:'OmniStack',
        Descricao: 'Uma semana para aprender a programar em node, react e react native.'
        });
        
return resposta;
});

routes.post('/sessions',sessionController.create);

routes.get('/ongs',ongController.index);
routes.post('/ongs',ongController.create);

routes.get('/incidents',incidentController.index);
routes.post('/incidents',incidentController.create);
routes.delete('/incidents/:id',incidentController.delete);

routes.get('/profile',profileController.index);

module.exports = routes;