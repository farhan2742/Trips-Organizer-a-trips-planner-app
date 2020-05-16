const mongoose      = require("mongoose");

const countrySchema = new mongoose.Schema({
  name: String,
  capital: String,
  region: String,
  population: Number,
  area: Number,
  timezones: Array,
  currencies: Array,
  flag: String
})

const Country = mongoose.model("Country", countrySchema);

module.exports = {
	countrySchema,
	Country
}
