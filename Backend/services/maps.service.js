const axios = require('axios');
const process = require('process');

module.exports.getAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error('Address is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const baseUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(baseUrl, {
            params: {
                address,
                key: apiKey,
            },
        });

        if (response.data.status !== 'OK') {
            throw new Error(`Geocoding error: ${response.data.status}`);
        }

        const location = response.data.results[0].geometry.location;
        return {
            ltd: location.lat,
            lng: location.lng,
        };
    } catch (error) {
        console.error('Error fetching coordinates:', error.message);
        throw new Error('Unable to fetch coordinates');
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[0].elements[0].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};
module.exports.getAutoCompleteSuggestions = async (input) => {
    if(!input){
        throw new Error('query is required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API; // Use your actual API key here
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            return response.data.predictions; // You can customize the response data as needed
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(err);
        throw new Error('Unable to fetch suggestions');
    }
};
