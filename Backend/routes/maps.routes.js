const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller'); // Make sure the path is correct
const { query } = require('express-validator');

// Correctly reference the `getCoordinates` function from the controller
router.get(
    '/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getCoordinates // Use `mapController.getCoordinates`
);
router.get('/get-distance-time', 
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getDistanceTime
);
router.get('/get-suggestions', 
    query('input').isString().isLength({ min: 3 }),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
);

module.exports = router;

