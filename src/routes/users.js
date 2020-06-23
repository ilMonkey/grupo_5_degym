// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

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
router.post('/auth', [check('email').isEmail().withMessage('Tenes que escribir un mail valido')
.trim()
.not().isEmpty().withMessage('Elcampo no puede estar vacio')  
],usersController.auth)
router.post('/logout', usersController.logout);

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
// Poniendo el autMiddleware evito que cualquier persona entre a cualquier perfil, me autentifica que el que entre a usar el metodo profile sea el usuario correspondiente
// Este middleare pregunta quien sos, si es undefined te redirige a login 
router.get('/profile/:id', authMiddleware ,usersController.profile)

/*** EDIT ONE USER ***/ 
router.get('/profile/edit/:id', usersController.edit); /* GET - Form to create */
router.put('/profile/edit/:id', upload.any(), usersController.update); /* PUT - Update in DB */

/*** DELETE ONE USER***/ 
router.delete('/profile/delete/:id', usersController.destroy); /* DELETE - Delete from DB */

/***  ONE User***/ 
router.get('/password/', usersController.forgotPass); /* Reset  - Form to email */

module.exports = router;
