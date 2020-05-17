const   dotenv                = require('dotenv'),
        express               = require('express'),
        bodyParser            = require('body-parser'),
        mongoose              = require("mongoose"),
        Trip                  = require("../models/trip").Trip,
        User                  = require("../models/user").User,
        router                = express.Router({mergeParams: true});

// dot ENV
dotenv.config();

// Create new trie

router.post("/", isLoggedIn ,(req, res , body) => {
    trip = {
        title: req.body.title,
        departure: "",
        stops: [],
        destination: req.body.destination,
        destinationCountry: "",
        lat: "",
        lng: "",
        departureDate: req.body.departureDate,
        returnDate: req.body.returnDate,
        imageURL: "",
        packing: [],
        toDo: [],
        flight: [],
        hotel: [],
        currentWeather: {},
        forcastWeather: [],
        countryData: {}
    };
    res.redirect(307,'/fetchCordinates?new=true')
});

// Save newly created trip

router.post("/save", isLoggedIn ,(req, res, body) =>{
    trip.departure = req.body.departure;
    Trip.create(trip, function(err, tripCreated){
        console.log("trips Created")
        User.findOne({ username: req.user.username }, function (err, user) {
            if (err) {
                console.log(err)
            } else {
                user.trips.push(tripCreated)
                console.log("trip pushed")
            }
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Success");
                    res.redirect("/trips?auth=success")
                }
            })
                
        })
    })
});


// Send trips page

router.get('/', isLoggedIn ,(req, res) => {
    res.sendFile('dist/trips.html', { root: __dirname + '/../../../' })
});

// Send new trip create form

router.get('/new', isLoggedIn ,(req, res) => {
    res.sendFile('dist/new.html', { root: __dirname + '/../../../' })
});

// Delete a trip

router.delete("/:id", function(req, res){
    Trip.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            console.log(err)
            res.redirect(`/trips?delete=failed`)
        } else {
            res.redirect(`/trips`)
        }
    })
})

// Update trip request

router.put("/:id", isLoggedIn ,(req, res) => {
    Trip.findByIdAndUpdate(req.params.id, req.body.trip, function(err, updatedTrip){
        if (err) {
            console.log(err)
            res.redirect("/trips?edit=failed")
        } else {
            res.redirect(`/trips`)
        }
    })
});


// Send show trip page

router.get('/:id', isLoggedIn ,(req, res) => {
    res.sendFile('dist/trip.html', { root: __dirname + '/../../../' })
});


// Send trip edit form

router.get('/:id/edit', isLoggedIn ,(req, res) => {
    res.sendFile('dist/edit.html', { root: __dirname + '/../../../' })
});





function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/?auth=failed");
}


module.exports = router;