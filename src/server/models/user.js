const mongoose                = require("mongoose"),
      Trip    	              = require('./trip.js').Trip
      passportLocalMongoose   = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  trips: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip"
    }
  ]
})

userSchema.plugin(passportLocalMongoose);

const User =  mongoose.model("User", userSchema)

module.exports = {
  userSchema,
  User
}