// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

router.get('/', usersController.root); /* GET - All Users */

/*** CREATE ONE User ***/ 
router.get('/create/', usersController.create); /* GET - Form to create */
router.post('/create/', usersController.store); /* POST - Store in DB */

/*** EDIT ONE User ***/ 
router.get('/edit/:id', usersController.edit); /* GET - Form to create */
router.put('/edit/:id', usersController.update); /* PUT - Update in DB */

/*** DELETE ONE User***/ 
router.delete('/delete/:id', usersController.destroy); /* DELETE - Delete from DB */

module.exports = router;
