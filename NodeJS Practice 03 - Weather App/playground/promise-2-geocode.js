const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        var requestObject = {
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
            json: true
        }
        var callbackArrowFunction = (error, response, body) => {
            if (error) {
                console.log(JSON.stringify(error, undefined, 3));
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else if (body.status === 'OK') {
                var result = {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                }
                resolve(result);
            }
        }
        console.log('Retriveing location');
        request(requestObject, callbackArrowFunction);
    });
}

geocodeAddress('53120 paseo san agustin').then((res) => {
    console.log(JSON.stringify(res, undefined, 2));
}).catch((res) => {
    console.log(res);
});