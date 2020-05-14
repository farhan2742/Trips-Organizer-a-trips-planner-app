const mongoose            = require("mongoose");

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

Country = mongoose.model("Country", countrySchema);

module.exports = {
	schema: countrySchema,
	model: Country
}
