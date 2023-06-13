//importation express
const express = require('express');
const multer = require('multer');
//la fonction router
const router = express.Router();

//importation validator email
const validatorEmail = require('../middleware/validatorEmail');
//importation password
const password = require('../middleware/password');
//importation du controllers/user.js
const userCtrl = require('../controllers/user');


//la route (endpoint) signup
router.post("/signup", password, validatorEmail, userCtrl.signup);

//la route login
router.post("/login", userCtrl.login);



//exportation du module
module.exports = router;