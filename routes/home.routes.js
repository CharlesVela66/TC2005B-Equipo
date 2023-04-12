const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home.controller');

const googleController = require('../controllers/google.controller');

router.get('/iniciar-sesion', homeController.iniciar_sesion);

router.post('/iniciar-sesion', homeController.post_iniciar_sesion)

router.get('/registrarse', homeController.registrarse);

router.post('/registrarse', homeController.post_registrarse);

router.get('/cerrar-sesion', homeController.cerrar_sesion)

router.get('/', homeController.inicio);

router.get('/auth/google', googleController.authGoogle);

router.get('/google/callback', googleController.googleCallback);

router.get('/google/callback', googleController.googleCallback);

module.exports = router;