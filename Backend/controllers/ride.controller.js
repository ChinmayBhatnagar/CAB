const rideService = require('../services/ride.service')
const { validationResult } = require('express-validator');


module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id, // Ensure `_id` is used for MongoDB user reference
            pickup,
            destination,
            vehicleType
        });
        return res.status(201).json(ride);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: err.message });
    }
};
