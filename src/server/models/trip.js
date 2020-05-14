const mongoose                  = require("mongoose"),
      {flightSchema, Flight}    = require('./flight.js'),
      {hotelSchema, Hotel}    = require('./hotel.js'),
      {weatherSchema, Weather}  = require('./weather.js'),
      {countrySchema, Country}  = require('./country.js');


const tripSchema = new mongoose.Schema({
  title: String,
  departure: String,
  stops: Array,
  destination: String,
  destinationCountry: String,
  lat: String,
  lng: String,
  departureDate: String,
  returnDate: String,
  imageURL: String,
  packing: Array,
  toDo: Array,
  flight: [flightSchema],
  hotel: [hotelSchema],
  currentWeather: weatherSchema,
  forcastWeather: [weatherSchema],
  countryData: countrySchema
})

const Trip =  mongoose.model("Trip", tripSchema)

module.exports = {
  schema: tripSchema,
  model: Trip
}