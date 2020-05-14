const mongoose            = require("mongoose");

const flightSchema = new mongoose.Schema({
  flight: String,
  confirmation: String,
  gate: String,
  class: String,
  status: String,
  departure: String,
  arival: String,
})

const Flight = mongoose.model("Flight", flightSchema)

module.exports = {
	schema: flightSchema,
	model: Flight
}