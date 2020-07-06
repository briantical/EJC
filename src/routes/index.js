const { Router } = require('express');
const { insertUser, fetchUser } = require('./handlers');

const routes = Router();

routes.post('/user', insertUser);
routes.get('/user/:username', fetchUser);

module.exports = routes;
