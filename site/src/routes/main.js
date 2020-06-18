// ************ Require's ************
const express = require('express');
const router = express.Router();
const {check} = require('express-validator')
// ************ Controller Require ************
const mainController = require('../controllers/mainController');

router.get('/', mainController.root); /* GET - home page */
router.get('/search', mainController.search); /* GET - search results */
router.post('/login', [
	check('email')
	.isEmail().withMessage('Debe escribir un mail valido')
	.trim()
] ,mainController.processLogin)



module.exports = router;