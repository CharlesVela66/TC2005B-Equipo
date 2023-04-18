const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/iniciar-sesion', homeController.iniciar_sesion);

router.post('/iniciar-sesion', homeController.post_iniciar_sesion)

router.get('/registrarse', homeController.get_registrarse);

router.post('/registrarse', homeController.post_registrarse);

router.get('/informacion', homeController.get_informacion);

router.post('/informacion', homeController.post_informacion);

router.get('/cerrar-sesion', homeController.cerrar_sesion);

router.get('/', homeController.inicio);

module.exports = router;