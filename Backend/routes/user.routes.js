const express = require('express');
const router = express.Router();
const {body} = require("express-validator")
const userController = require('../controllers/user.controller')

router.post('/register', [
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({min : 3}).withMessage('first name must be atleast 3 char'),
    body('password').isLength({min: 6}).withMessage('must be 6')

],
userController.registerUser
)


module.exports = router;