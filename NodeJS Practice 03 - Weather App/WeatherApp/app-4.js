const yargs = require('yargs');
const axios = require('axios');

// Different configuration for yargs.
// There's no need of a command, just an option.
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address geocode.',
            string: true // Tells yargs to always parse the 'a' as a string.
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
        console.log(JSON.stringify(results, undefined, 2));
    })
    .catch(function (error) {
        if (error.code === 'ENOTFOUND') {
            console.log('Unabe to connect to Google servers.');
        } else {
            console.log(error.message);
        }
    });