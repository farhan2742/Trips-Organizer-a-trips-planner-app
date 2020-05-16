const   express        = require('express'),
        bodyParser     = require('body-parser'),
        mongoose       = require("mongoose"),
        //isLoggedIn     = require("../helpers/isLoggedIn"),
        User           = require("../models/user").User,
        router         = express.Router({mergeParams: true});


// Send DB data to save to local storage

router.get("/fetchData", isLoggedIn ,(req, res) => {
   let dataToSend = [];
    User.findOne({ username: req.user.username }).populate("trips").exec(function (err, user) {
        if (err) {
            console.log(err)
            res.send(dataToSend);
        }
        else {
            dataToSend = user.trips;
            res.send(dataToSend);
        }
    });
});

// Send current trip data to confirm before saving
  
router.get("/tripData", isLoggedIn ,(req, res) => {
    res.send(trip);
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/?auth=failed");
}

module.exports = router;