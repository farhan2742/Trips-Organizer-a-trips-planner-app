// Set dependancies

const mongoose                  = require("mongoose"),
      {flightSchema, Flight}    = require('./flight.js'),
      {hotelSchema, Hotel}    = require('./hotel.js'),
      {weatherSchema, Weather}  = require('./weather.js'),
      {countrySchema, Country}  = require('./country.js'),
      {tripSchema, Trip}        = require('./trip.js'),
      {userSchema, User}        = require('./user.js');

function seedDB() {
      User.remove({}, function (err) {
            if (err) {
                  console.log(err)
            } else {
                  console.log("Removed Users");
            }
      })
}

module.exports = seedDB;