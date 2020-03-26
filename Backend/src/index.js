const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

app.use(cors());
app.use(express.json());//define o tipo de objeto utilizado em requisições.
app.use(routes);
/**
 * Metodos http:
 * get: buscar uma informacao no backend
 * post: criar informacao no backend
 * put: Alterar uma informacao no backend
 * delete: deletar um informacao no backend
 */

/**
 * Tipos de parametros
 * 
 * Query: parametros nomeados enviados na rota apos o "?" /users?id=1
 * Route: parametros utilizados para identificar recursos /users/:id
 * requet body:
 */


app.listen(3333);
