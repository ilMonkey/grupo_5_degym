// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

// ************ DiskStorage de Multer ************
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(files.originalname))
    }
  })
   
  var upload = multer({ storage: storage })


router.get('/', productsController.all); /* GET - All products */
router.get('/:id', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); /* GET - Form to create */
router.post('/', productsController.store); /* POST - Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', productsController.edit); /* GET - Form to create */
router.put('/:id', productsController.update); /* PUT - Update in DB */
// upload.any() es el middleware

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;
