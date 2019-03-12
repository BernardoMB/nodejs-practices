// Geocoding address with geocode.js
// Fetch weather forecast with weather.js

const yargs = require('yargs');
const geocode = require('./../own_modules/geocode.js');
const weather = require('./../own_modules/weather.js');

// Configuring yargs.
const addressOptions = {describe: 'Address to work with', demand: true, alias: 'a'};
const latOptions = {describe: 'Latitude to search weather forecast to', demand: true, alias: 'l'}
const lngOptions = {describe: 'Longitude to search weather forecast to', demand: true, alias: 'g'}
const argv = yargs
    .command('address', 'Search an address.', {address: addressOptions})
    .command('weather', 'Search weather forecast for a location.', {latitude: latOptions, longitude: lngOptions})
    .command('weatherP', 'Search weather forecast for an address.', {address: addressOptions})
    .help()
    .argv;

var command = argv._[0];
console.log('Command: ', command);
//console.log('Yargs', argv);

var handler = (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 3));
    }
}

var handler2 = (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, handler);
    }
}

if (command === 'address') {
    geocode.geocodeAddress(argv.address, handler);
} else if (command === 'weather') {
    weather.getWeather(argv.latitude, argv.longitude, handler);
} else if (command === 'weatherP') {
    geocode.geocodeAddress(argv.address, handler2);
} else {
    console.log('No command specified.');
}