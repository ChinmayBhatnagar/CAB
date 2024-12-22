const captainController = require('../controllers/captain.controller');
const express = require('express');
const router = express.Router();
const { body } = require("express-validator")
const authMiddleware = require('../middlewares/auth.middleware')


router.post('/register', [
    body('email').isEmail().withMessage('invalid email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('first name must be atleast 3 char'),
    body('password').isLength({ min: 6 }).withMessage('must be 6'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('color'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('plate'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('capacity'),
    body('vehicle.vehicleType').isLength({ min: 3 }).withMessage('vehicleType')
],
    captainController.registerCaptain
) 

router.post('/login',[
    body('email').isEmail().withMessage('invalid email'),
    body('password').isLength({ min: 6 }).withMessage('password')
], 
    captainController.loginCaptain    
)


router.get('/profile',authMiddleware.authCaptain ,captainController.getCaptainProfile)

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)


module.exports = router;
