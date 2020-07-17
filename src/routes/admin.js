// ************ Require's ************
const express = require('express');
const router = express.Router(); 
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// ************ DiskStorage de Multer ************ 
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/actividades')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  var upload = multer({ storage: storage })
// ************ END DiskStorage de Multer ************

/*** GET ADMIN GENERAL panel ***/ 
router.get('/', adminMiddleware ,adminController.controlPanel);


//Branches controllers
/*** GET ADMIN-BRANCHES panel ***/ 
router.get('/branches', adminMiddleware, adminController.showBranches);
/*** CREATE ONE BRANCH***/ 
router.post('/branches', adminMiddleware,  adminController.storeBranch);
/*** DELETE ONE BRANCH***/ 
router.delete('/branches/delete/:id',  adminMiddleware, adminController.destroyBranch); 

//Activities controllers
/*** GET ADMIN-ACTIVITY panel ***/ 
router.get('/activities', adminMiddleware, adminController.showActivities);
/*** CREATE ONE ACTIVITY***/ 
router.post('/activities', upload.any(), adminMiddleware, adminController.storeActivity);
/*** DELETE ONE ACTIVITY***/ 
router.delete('/activities/delete/:id',  adminMiddleware, adminController.destroyActivity);

//Users controllers
/*** GET listado de Usuarios panel ***/ 
router.get('/users', adminMiddleware, adminController.showUsers);
/*** EDIT ONE USER ***/ 
router.put('/user/edit/:id', authMiddleware, adminController.storeUser); /* PUT - Update in DB */

/*** DELETE ONE USER***/ 
router.delete('/user/delete/:id', authMiddleware, adminController.destroyUser); /* DELETE - Delete from DB */

module.exports = router;

