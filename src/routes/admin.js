// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');

// ************ Controller Require ************
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

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
router.get('/', authMiddleware ,adminController.controlPanel);


//Branches controllers
/*** GET ADMIN-BRANCHES panel ***/ 
router.get('/branches', adminController.showBranches);
/*** CREATE ONE BRANCH***/ 
router.post('/branches', adminController.storeBranch);
/*** DELETE ONE BRANCH***/ 
router.delete('/branches/delete/:id', adminController.destroyBranch); 

//Activities controllers
/*** GET ADMIN-ACTIVITY panel ***/ 
router.get('/activities', adminController.showActivities);
/*** CREATE ONE ACTIVITY***/ 
router.post('/activities', adminController.storeActivity);
/*** DELETE ONE ACTIVITY***/ 
router.delete('/activities/delete/:id', adminController.destroyActivity);

module.exports = router;

