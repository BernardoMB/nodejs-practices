const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        var apiKey = '';
        var requestObject = {
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
            json: true
        }
        var callbackArrowFunction = (error, response, body) => {
            if (error) {
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

var getWeather = (lat, lng) => {
    return new Promise((resolve, reject) => {
        var apiKey = '';
        request({
            url: `https://api.forecast.io/forecast/${apiKey}/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to Google servers.');
            } else if (response.statusCode === 400) {
                console.log(body);
                reject('Cannot find weather forecast fot that location.');
            } else if (response.statusCode === 200) {
                resolve({
                    temperature: body.currently.temperature,
                    apparentTemperature: body.currently.apparentTemperature
                });
            }
        });
    });
}

geocodeAddress('53120 paseo san agustin')
    .then((res) => {
        console.log(JSON.stringify(res, undefined, 2));
        return getWeather(res.latitude, res.longitude);
    }, (res) => {
        console.log('Something went wrong retriveing the location.');
        console.log(res);
    })
    .then((res) => {
        console.log(JSON.stringify(res, undefined, 2));
    }, (res) => {
        console.log('Something went wrong retriveing the weather.');
        console.log(res);
    });