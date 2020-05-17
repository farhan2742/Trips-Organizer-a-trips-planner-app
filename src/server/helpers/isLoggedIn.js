const   passport                = require("passport"),
        passportLocal           = require("passport-local"),
        passportLocalMongoose   = require("passport-local-mongoose"),
        User                    = require("../models/user").User;

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/?auth=failed");
}

module.exports = isLoggedIn();
  