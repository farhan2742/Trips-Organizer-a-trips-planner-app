const mongoose    = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  confirmation: String,
  address: String,
  checkin: String,
  checkout: String,
  stay: String,
  room: String
})

const Hotel = mongoose.model("Hotel", hotelSchema)

module.exports = {
	hotelSchema,
	Hotel
}