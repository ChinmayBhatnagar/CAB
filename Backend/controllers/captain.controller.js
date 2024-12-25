const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const BlacklistToken = require('../models/blacklistToken.model');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    try {
        // Check if captain already exists
        const existingCaptain = await captainModel.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ message: 'Captain already exists' });
        }

        // Hash the password
        const hashedPassword = await captainModel.hashPassword(password);

        // Create new captain
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        });

        const token = captain.generateAuthToken();

        res.status(201).json({ token, captain });
    } catch (error) {
        next(error);
    }
};

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token);
        res.status(200).json({ token, captain });
    } catch (error) {
        next(error);
    }
};

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json({ captain: req.captain });
};

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await BlacklistToken.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
};
