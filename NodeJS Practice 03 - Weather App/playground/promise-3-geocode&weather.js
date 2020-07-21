const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);
        var apiKey = 'AIzaSyAjKVL0P-26C6Qw8TpcK4fskV8gr-alvxE';
        var requestObject = {
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
            json: true
        }
        var callbackArrowFunction = (error, response, body) => {
            console.log(body);
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
        var apiKey = '29b0d090e5msh40ddcc235d76ec1p1a4c6bjsnfa4d1d8eeae6';
        request({
            url: `https://community-open-weather-map.p.rapidapi.com/weather?lat=${lat}&lon=${lng}`,
            headers: {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": apiKey,
                "useQueryString": true
                
            },
            json: true
        }, (error, response, body) => {
            console.log('\nResponse status:', response.statusCode);
            console.log('\nReponse body', response.body);
            if (error) {
                reject('Unable to connect to servers.');
            } else if (response.statusCode === 400) {
                console.log(body);
                reject('Cannot find weather forecast fot that location.');
            } else if (response.statusCode === 200) {
                resolve({
                    getWeatherData: response.body
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
        console.log('Res', res);
        console.log(JSON.stringify(res, undefined, 2));
    }, (res) => {
        console.log('Something went wrong retriveing the weather.');
        console.log(res);
    });