const mongoose                = require("mongoose"),
      tripSchema    	        = require('./trip.js').tripSchema
      passportLocalMongoose   = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  trips: [tripSchema]
})

userSchema.plugin(passportLocalMongoose);

const User =  mongoose.model("User", userSchema)

module.exports = {
  userSchema,
  User
}