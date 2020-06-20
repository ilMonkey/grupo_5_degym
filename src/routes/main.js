// ************ Require's ************
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.root); /* GET - home page */
router.get('/search', mainController.search); /* GET - search results */
router.post('/login', [
    // El usuario tiene que ser un email para poder ingresar
    check('email').isEmail().trim(),
    // La contraseña tiene que tenes 4 caracteres como minimo
    check('password').isLength({min: 4})]
    ,mainController.processLogin);



module.exports = router;