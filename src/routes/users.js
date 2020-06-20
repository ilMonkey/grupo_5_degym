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
router.post('/auth', [check('email').isEmail().trim()],usersController.auth)

/*** CREATE ONE USER ***/ 
router.get('/create', usersController.create); /* GET - Form to create */
router.post('/create', upload.any(), [
  check('first_name').not().isEmpty().withMessage('Te olvidaste ingresar tu nombre!'),
  check('last_name').not().isEmpty().withMessage('Te olvidaste ingresar tu apellido!'),
  check('email').isEmail().trim().withMessage('Tenes que poner un mail valido'),
  check('mobile_number').not().isEmpty().isNumeric({no_symbols: false}).withMessage('Debe poner un celular valido'),
  check('birth_day').not().isEmpty().withMessage('No te olvides de tu fecha de cumpleaños!'),
  check('password').isLength({min: 4}).withMessage('La contraseña tiene que tener 4 caracteres como minimo').matches(/\d/).withMessage('La contraseña debe contener al menos un numero'),  
  check('sub_password', 'Las contraseñas no coinciden').custom((value, {req}) => (value === req.body.password))]
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
