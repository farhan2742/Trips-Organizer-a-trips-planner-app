const mongoose                  = require("mongoose"),
      {tripSchema, Trip}    	= require('./trip.js');

const userSchema = new mongoose.Schema({
  user: String,
  pass: String,
  email: String,
  trips: [tripSchema]
}) 

const User =  mongoose.model("User", userSchema)

module.exports = {
  schema: userSchema,
  model: User
}