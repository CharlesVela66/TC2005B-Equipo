const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home.controller');

router.get('/iniciar-sesion', homeController.iniciar_sesion);

router.post('/iniciar-sesion', homeController.post_iniciar_sesion)

router.get('/registrarse', homeController.registrarse);

router.post('/registrarse', homeController.post_registrarse);

router.get('/cerrar-sesion', homeController.cerrar_sesion)

router.get('/', homeController.inicio);

module.exports = router;