const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    var requestObject = {
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true
    }
    var callbackArrowFunction = (error, response, body) => {
        if (error) {
            console.log(JSON.stringify(error, undefined, 3));
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            var result = {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            }
            callback(undefined, result);
        }
    }
    request(requestObject, callbackArrowFunction);
}

module.exports.geocodeAddress = geocodeAddress;