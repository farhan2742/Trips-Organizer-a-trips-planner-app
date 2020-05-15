const mongoose            = require("mongoose"),
      flightSchema        = require('./flight.js').flightSchema,
      hotelSchema         = require('./hotel.js').hotelSchema,
      weatherSchema       = require('./weather.js').weatherSchema,
      countrySchema       = require('./country.js').countrySchema;


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
  tripSchema,
  Trip
}