// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

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
router.get('/new/create', adminMiddleware, productsController.create); /* GET - Form to create */
router.post('/new/create', adminMiddleware, productsController.store); /* POST - Store in DB */

// /*** EDIT ONE PRODUCT ***/ 
router.get('/:id/edit', adminMiddleware, productsController.edit); /* GET - Form to create */
router.put('/:id', adminMiddleware, productsController.update); /* PUT - Update in DB */

// upload.any() es el middleware
 
/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', adminMiddleware, productsController.destroy); /* DELETE - Delete from DB */

module.exports = router;
