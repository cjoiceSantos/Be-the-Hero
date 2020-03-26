const express = require('express');
const routes = express.Router();

const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");

routes.get('/profile', ProfileController.index);
routes.post('/session', SessionController.create);

routes.post('/ongs', OngController.create);
routes.get('/ongs', OngController.index);

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.delete);



module.exports = routes;
 