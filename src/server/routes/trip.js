const   dotenv                = require('dotenv'),
        express               = require('express'),
        bodyParser            = require('body-parser'),
        mongoose              = require("mongoose"),
        Trip                  = require("../models/trip").Trip,
        User                  = require("../models/user").User,
        //isLoggedIn            = require("../helpers/isLoggedIn"),
        router                = express.Router({mergeParams: true});

// dot ENV
dotenv.config();

// Create new trie

router.post("/", isLoggedIn ,(req, res , body) => {
    projectData = {'trips' : []};
    const data = {}
    data.title = req.body.title;
    data.destination = req.body.destination;
    data.destinationCountry = "";
    data.lat = "";
    data.lng = "";
    data.departureDate = req.body.departureDate;
    data.returnDate = req.body.returnDate;
    data.imageURL = "";
    data.currentWeather = {}
    data.forcastWeather = []
    data. countryData = {}
    projectData.trips.push(data);
    res.redirect(307,'/fetchCordinates?new=true')
});

// Save newly created trip

router.post("/save", isLoggedIn ,(req, res, body) =>{
    projectData.trips[0].departure = req.body.departure;
    if (req.query.new === "true") {
        User.findOne({ username: req.user.username }, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                user.trips.push({
                    title: projectData.trips[0].title,
                    departure: projectData.trips[0].departure,
                    destination: projectData.trips[0].destination,
                    destinationCountry: projectData.trips[0].destinationCountry,
                    lat: projectData.trips[0].lat,
                    lng: projectData.trips[0].lng,
                    departureDate: projectData.trips[0].departureDate,
                    returnDate: projectData.trips[0].returnDate,
                    imageURL: projectData.trips[0].imageURL,
                    currentWeather: {
                        weatherDate: projectData.trips[0].currentWeather.currentWeatherDate,
                        weatherIcon: projectData.trips[0].currentWeather.currentWeatherIcon,
                        weatherDescription: projectData.trips[0].currentWeather.currentWeatherDescription,
                        weatherWind: projectData.trips[0].currentWeather.currentWeatherWind,
                        weatherTemp: projectData.trips[0].currentWeather.currentWeatherTemp,
                        weatherUV: projectData.trips[0].currentWeather.currentWeatherUV,
                        weatherSnow: projectData.trips[0].currentWeather.currentWeatherSnow
                    },
                    countryData: {
                        name: projectData.trips[0].countryData.name,
                        capital: projectData.trips[0].countryData.capital,
                        region: projectData.trips[0].countryData.region,
                        population: projectData.trips[0].countryData.population,
                        area: projectData.trips[0].countryData.area,
                        timezones: projectData.trips[0].countryData.timezones,
                        currencies: projectData.trips[0].countryData.currencies,
                        flag: projectData.trips[0].countryData.flag
                    }
                })

                const currentTrip = user.trips.length-1;  

                for (const forcast of projectData.trips[0].forcastWeather) {
                    user.trips[currentTrip].forcastWeather.push({
                        weatherDate: forcast.forcastWeatherDate,
                        weatherIcon: forcast.forcastWeatherIcon,
                        weatherDescription: forcast.forcastWeatherDescription,
                        weatherWind: forcast.forcastWeatherWind,
                        weatherTemp: forcast.forcastWeatherTemp,
                        weatherUV: forcast.forcastWeatherUV,
                        weatherSnow: forcast.forcastWeatherSnow
                    })
                }
            }

            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Success");
                }
            });
        })
        res.redirect("/trips?auth=success")
    }
});

// Send trips page

router.get('/', isLoggedIn ,(req, res) => {
    res.sendFile('dist/trips.html', { root: __dirname + '/../../../' })
});

// Send new trip create form

router.get('/new', isLoggedIn ,(req, res) => {
    res.sendFile('dist/new.html', { root: __dirname + '/../../../' })
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