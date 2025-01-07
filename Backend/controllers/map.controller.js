const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req); // Validate request
    if (!errors.isEmpty()) { // Corrected `error` to `errors`
        return res.status(400).json({ errors: errors.array() }); // Return validation errors
    }

    const { address } = req.query;

    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinate not found' });
    }
};
module.exports.getDistanceTime = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
        const { origin, destination } = req.query;

        const distanceTime = await mapService.getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);

    }catch(err){
        console.error(err);
        res.status(500).json({message: 'internal server error'});
    }
}
module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json({
            status: 'success',
            suggestions
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching suggestions' });
    }
};