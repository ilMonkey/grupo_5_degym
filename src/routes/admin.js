// ************ Require's ************
const express = require('express');
const router = express.Router();

// ************ Controller Require ************
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

/*** GET ADMIN GENERAL panel ***/ 
// router.get('/', authMiddleware ,adminController.controlPanel);


//Branches controllers
/*** GET ADMIN-BRANCHES panel ***/ 
// router.get('/branches', adminController.showBranches);
/*** CREATE ONE BRANCH***/ 
router.post('/branches', adminController.storeBranch);
/*** DELETE ONE BRANCH***/ 
// router.delete('/branches/delete/:id', adminController.destroyBranch);

module.exports = router;

