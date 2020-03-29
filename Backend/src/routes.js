const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate'); //Joi é uma biblioteca de validação utilizada pelo celebrate.
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

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}),ongController.create);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
        pageSize: Joi.number().required(),
    })
}),incidentController.index);
routes.post('/incidents',incidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}),incidentController.delete);

/**
 * para validação de header nao utilizar .keys(),
 * utilizar apenas .object({object}).unknown()
 */
routes.get('/profile',celebrate({ 
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown(),
}),profileController.index);

module.exports = routes;