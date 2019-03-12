const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for.',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);

axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`)
    .then(function (response) {
        if (response.data.status === 'ZERO_RESULTS') {
            throw new Error('Unable to find that address.');
        }
        var results = {
            address: response.data.results[0].formatted_address,
            latitude: response.data.results[0].geometry.location.lat,
            longitude: response.data.results[0].geometry.location.lng
        }
        console.log(results.address);
        return axios.get(`https://api.forecast.io/forecast/4a04d1c42fd9d32c97a2c291a32d5e2d/${results.latitude},${results.longitude}`);
    })
    .then((response) => {
        var weatherResults = {
            temperature: response.data.currently.temperature,
            apparentTemperature: response.data.currently.apparentTemperature
        }
        console.log(JSON.stringify(weatherResults, undefined, 2)); 
    })
    .catch(function (error) {
        if (error.code === 'ENOTFOUND') {
            console.log('Unabe to connect to Google servers.');
        } else {
            console.log(error.message);
        }
    });