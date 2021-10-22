const express = require('express');
const pessoas = require('./controllers/pessoas');

const routes = express();

routes.post('/cadastrar', pessoas.cadastrar);
routes.post('/newsletter', pessoas.newsletter);

module.exports = routes;