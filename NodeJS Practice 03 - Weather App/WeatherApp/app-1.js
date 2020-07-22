// Requests basics.
// Geocoding address.

const request = require('request');
const yargs = require('yargs');

// Configureing yargs.
// Different configuration for yargs.
// There's no need of a command, just an option.
const argv = yargs
    .options({ // Top level options
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for.',
            string: true // Tells yargs to always parse the 'a' as a string.
        }
    })
    .help()
    .alias('help', 'h')
    .argv;
// console.log(argv);

// Because the input is going to be on a url it must be encoded usging a built in JS function:
var encodedAddress = encodeURIComponent(argv.address);

var apiKey = 'AIzaSyAjKVL0P-26C6Qw8TpcK4fskV8gr-alvxE';

var requestObject = {
    // Using query strings (%20: space encoded).
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
    // The data that comes in will be parsed to a json object.
    json: true
}

// Callback function that gets fired when the data comes from the service.
var callbackArrowFunction = (error, response, body) => {
    if (error) {
        console.log(JSON.stringify(error, undefined, 3));
        console.log('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
        console.log('Unable to find that address.');
    } else {
        // console.log('No errors.');
        // Printing results with template Strings.
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
}

// Callback function.
request(requestObject, callbackArrowFunction);