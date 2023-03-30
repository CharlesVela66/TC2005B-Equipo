const express = require('express');

const router = express.Router();

const hasCreate = require('../util/has-create');

const adminController = require('../controllers/admin.controller');

router.get('/', hasCreate, adminController.home);

module.exports = router;