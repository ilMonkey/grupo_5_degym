// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const {check} = require('express-validator')

// ************ Controller Require ************
const usersController = require('../controllers/usersController');

// ************ DiskStorage de Multer ************ 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/users')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  var upload = multer({ storage: storage })
// ************ END DiskStorage de Multer ************



/*** LOGIN ONE USER ***/ 
router.get('/login', usersController.login)
router.post('/auth', usersController.auth)

/*** CREATE ONE USER ***/ 
router.get('/create', usersController.create); /* GET - Form to create */
router.post('/create', upload.any(), [
  check('first_name').not().isEmpty().withMessage('Te olvidaste ingresar tu nombre!'),
  check('second_name').not().isEmpty().withMessage('Te olvidaste ingresar tu apellido!'),
  check('email').isEmail().trim(),
  check('password', 'La contraseña tiene que tener 4 caracteres como minimo').isLength({min: 4}),  
  check('sub_Password', 'Las contraseñas no coinciden').custom((value, {req}) => (value === req.body.password))]
  ,usersController.store); /* POST - Store in DB */

/*** PROFILE USER ***/ 
router.get('/profile', usersController.profile)

/*** EDIT ONE USER ***/ 
router.get('/edit/:id', usersController.edit); /* GET - Form to create */
router.put('/edit/:id', usersController.update); /* PUT - Update in DB */

/*** DELETE ONE USER***/ 
router.delete('/delete/:id', usersController.destroy); /* DELETE - Delete from DB */

/***  ONE User***/ 
router.get('/password/', usersController.forgotPass); /* Reset  - Form to email */

module.exports = router;
