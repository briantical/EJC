const { Router } = require('express');
const { insertUser, fetchUser } = require('./handlers');

const routes = Router();

routes.get('/', (req, res) => {
  res.json({ message: 'Welcome to The API Server' });
});
routes.post('/user', insertUser);
routes.get('/user/:username', fetchUser);

module.exports = routes;
