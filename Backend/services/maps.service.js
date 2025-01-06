const axios = require('axios');
const process = require('process');

module.exports.getAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error('Address is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API; // Replace with your actual API key
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
