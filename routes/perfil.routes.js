const express = require('express');

const router = express.Router();

const perfilController = require('../controllers/perfil.controller');

router.get('/', perfilController.ver_perfil);

router.get('/ver_informacion', perfilController.ver_informacion);

router.post('/ver_informacion', perfilController.post_ver_informacion);

module.exports = router;