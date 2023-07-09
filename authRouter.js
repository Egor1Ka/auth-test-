const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const authMiddleware = require('./middleware/authMiddleware')

const controller = require('./authController')

router.post('/registration',[
    check('login','login cant be empty').notEmpty(),
    check('password','passwort can bo more 4 simbol').isLength({min:4,max:10})
],controller.registration)
router.post('/login',controller.login)
router.post('/checkWorkSpace',controller.checkWorkSpace)
router.get('/storage',controller.storage)
router.get('/users',authMiddleware,controller.getUsers)

module.exports = router;
