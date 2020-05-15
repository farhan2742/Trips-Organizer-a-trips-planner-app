const mongoose    = require("mongoose");

const weatherSchema = new mongoose.Schema({
  weatherDate: String,
  weatherIcon: String,
  weatherDescription: String,
  weatherWind: Number,
  weatherTemp: Number,
  weatherUV: Number,
  weatherSnow: Number
})

const Weather = mongoose.model("Weather", weatherSchema)

module.exports = {
  weatherSchema,
  Weather
}

