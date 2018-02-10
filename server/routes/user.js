const express = require('express');
const router = express.Router();
const controllerUser = require('../controllers/controllerUser')

router.get('/', controllerUser.getData)
router.get('/:id', controllerUser.getDataId)
router.post('/login', controllerUser.login)

module.exports = router;
