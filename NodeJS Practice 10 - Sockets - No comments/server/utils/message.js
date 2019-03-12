const moment = require('moment');

var generateMessage = (from, text) => {
  var message = {
        from,
        text,
        createdAt: moment().valueOf()
    };
    return message;
};

var generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

module.exports = {generateMessage, generateLocationMessage};