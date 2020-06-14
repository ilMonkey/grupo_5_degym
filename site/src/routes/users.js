// ************ Require's ************
const express = require('express');
const router = express.Router();
const {check} = require('express-validator')

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/', usersController.root); /* GET - All Users */

/*** LOGIN ONE User ***/ 
router.get('/login', usersController.root)
router.post('/login',usersController.processLogin)

/*** CREATE ONE User ***/ 
router.get('/create/', usersController.create); /* GET - Form to create */
router.post('/create/', usersController.store); /* POST - Store in DB */

/*** PROFILE User ***/ 
router.get('/profile', usersController.profile)

/*** EDIT ONE User ***/ 
router.get('/edit/:id', usersController.edit); /* GET - Form to create */
router.put('/edit/:id', usersController.update); /* PUT - Update in DB */

/*** DELETE ONE User***/ 
router.delete('/delete/:id', usersController.destroy); /* DELETE - Delete from DB */

/*** DELETE ONE User***/ 
router.get('/password/', usersController.forgotPass); /* Reset  - Form to email */

module.exports = router;
