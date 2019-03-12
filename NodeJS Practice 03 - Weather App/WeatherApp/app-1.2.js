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
console.log(argv);

const apiKey = 'AIzaSyAWEu5iJDVTWdFJ4jPz2sMZQx1Kq5Q5PAU';
const outputFormat = 'json';

var getData = (address) => {
    // Because the input is going to be on a url it must be encoded usging a built in JS function:
    var encodedAddress = encodeURIComponent(address);
    var requestObject = {
        url: `https://maps.googleapis.com/maps/api/geocode/${outputFormat}?address=${encodedAddress}&key=${apiKey}`,
        json: true
    }
    return new Promise((resolve, reject) => {
        request(requestObject, (error, response, body) => {
            if (error) {
                console.log(JSON.stringify(error, undefined, 3));
                reject('Unable to connect to Google servers.');
            } else if (body.status === 'ZERO_RESULTS') {
                reject('Unable to find that address.');
            } else {
                const result = {
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                }
                resolve(result);
            }
        });
    });
}

getData(argv.address).then((result) => {
    console.log('Result:', result);
}, (error) => {
    console.log('Error ocurred:', error);
});
