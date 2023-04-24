const express = require('express'); 
//Método de express llamado router, que al ejecutarse, se vuelve un objeto almacenado en router
const router = express.Router(); 

const perfilController = require('../controllers/perfil.controller');

//Ruta inicial
router.get('/', perfilController.ver_perfil);

router.get('/ver_info', perfilController.verCliente);

router.get('/ver-info', perfilController.verAdministrador);

// Renderiza la vista para editar la información del cliente
router.get('/editar_info', perfilController.get_editarPerfil);
// Recibe los datos enviados por el formulario de edición y actualiza la información del cliente
router.post('/editar_info', perfilController.post_editarPerfil);

router.get('/editar-info', perfilController.get_editarPerfilAdmin);
router.post('/editar-info', perfilController.post_editarPerfilAdmin);

//Exporto el módulo 
module.exports = router;