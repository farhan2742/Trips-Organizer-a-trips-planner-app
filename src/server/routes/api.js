const   dotenv                = require('dotenv'),
        express               = require('express'),
        GeocoderGeonames      = require('geocoder-geonames'),
        https                 = require("https"),
        //isLoggedIn            = require("../helpers/isLoggedIn"),
        router                = express.Router({mergeParams: true});

// dot ENV
dotenv.config();

// Geocoder
const geocoder = new GeocoderGeonames({
	username: process.env.GEONAMES_API_ID
});


router.post("/fetchCordinates", isLoggedIn ,(req, res, body) => {
    if (req.query.new === "true") {
        geocoder.get('search',{
            q: trip.destination
        })
        .then(function(response){
            trip.destinationCountry =response.geonames[0].countryName
            trip.lat = response.geonames[0].lat;
            trip.lng = response.geonames[0].lng;
            res.redirect(307,'/fetchCurrentWeather?new=true')
        })
        .catch(function(error){
            console.log(error);
        });
    } 	
});


// Fetch current weather data about trip destination


router.post("/fetchCurrentWeather", isLoggedIn ,(req, res, body) => {
    if (req.query.new === "true") {
        const baseURL = "https://api.weatherbit.io/v2.0/current?";
        const ApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
        const lat = `lat=${trip.lat}`;
        const lon = `&lon=${trip.lng}`;
        const URL = baseURL+lat+lon+ApiKey;
        https.get(URL,(rasp) => {
            let data =  '';
            rasp.on('data', (chunk) => {
                data += chunk
            })
            rasp.on('end', () => {
                const currentWeather = (JSON.parse(data));
                trip.currentWeather.weatherDate = currentWeather.data[0].last_ob_time
                trip.currentWeather.weatherIcon = currentWeather.data[0].weather.icon
                trip.currentWeather.weatherDescription = currentWeather.data[0].weather.description
                trip.currentWeather.weatherWind = currentWeather.data[0].wind_spd
                trip.currentWeather.weatherTemp = currentWeather.data[0].temp
                trip.currentWeather.weatherUV = currentWeather.data[0].uv
                trip.currentWeather.weatherSnow = currentWeather.data[0].snow
                res.redirect(307 ,'/fetchForcastWeather?new=true')
            })
            rasp.on("error", (err) => {
                console.log("Error: " + err.message)
            })
        })
    }
});

// Fetch Forcast weather for trip destination

router.post("/fetchForcastWeather", isLoggedIn ,(req, res, body) => {
    if (req.query.new === "true") {
        const baseURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
        const ApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
        const lat = `lat=${trip.lat}`;
        const lon = `&lon=${trip.lng}`;
        const URL = baseURL+lat+lon+ApiKey;
        https.get(URL,(rasp) => {
            let data =  '';
            rasp.on('data', (chunk) => {
                data += chunk
            })
            rasp.on('end', () => {
                const forcastWeather = (JSON.parse(data));
                for (const forcast of forcastWeather.data ) {
                forcastWeatherData = {};
                forcastWeatherData.weatherDate = forcast.datetime
                forcastWeatherData.weatherIcon = forcast.weather.icon
                forcastWeatherData.weatherDescription = forcast.weather.description
                forcastWeatherData.weatherWind = forcast.wind_spd
                forcastWeatherData.weatherTemp = forcast.temp
                forcastWeatherData.weatherUV = forcast.uv
                forcastWeatherData.weatherSnow = forcast.snow
                trip.forcastWeather.push(forcastWeatherData)
            }
                res.redirect(307,'/fetchDestinationImage?new=true')
            })
                rasp.on("error", (err) => {
                console.log("Error: " + err.message)
            })
        })
    }
});

// fetch Destination Image

router.post("/fetchDestinationImage", isLoggedIn ,(req, res, body) => {
    if (req.query.new === "true") {
        const baseURL = "https://pixabay.com/api/?";
        const ApiKey = `key=${process.env.PIXABAY_API_KEY}`;
        const query = `&q=${trip.destination}`;
        const options = `&category=places&image_type=photo&safesearch=true}`;
        const URL = baseURL+ApiKey+query+options;
        https.get(URL,(rasp) => {
            let data =  '';
            rasp.on('data', (chunk) => {
                data += chunk
            })
            rasp.on('end', () => {
                const destinationImage = (JSON.parse(data));
                if (destinationImage.hits.length === 0) {
                    const queryCountry = `&q=${trip.destinationCountry}`;
                    const URLCountry = baseURL+ApiKey+queryCountry+options;
                    https.get(URLCountry,(rasp) => {
                        let data =  '';
                        rasp.on('data', (chunk) => {
                            data += chunk
                        })
                        rasp.on('end', () => {
                            const destinationImageCountry = (JSON.parse(data));
                            if (destinationImageCountry.hits.length === 0) {
                                trip.imageURL = "";
                                res.redirect(307 ,'/fetchCountryData?new=true')
                            }
                            trip.imageURL = destinationImageCountry.hits[0].webformatURL
                            res.redirect(307 ,'/fetchCountryData?new=true')
                        })
                        rasp.on("error", (err) => {
                            console.log("Error: " + err.message)
                        })
                    })
                } else {
                    trip.imageURL = destinationImage.hits[0].webformatURL
                    res.redirect(307 ,'/fetchCountryData?new=true')
                }
            })
            rasp.on("error", (err) => {
                console.log("Error: " + err.message)
            })
        })
    } 
});

// fetch destination country data

router.post("/fetchCountryData", isLoggedIn ,(req, res, body) => {
    if (req.query.new === "true") {
        const baseURL = "https://restcountries.eu/rest/v2/name/";
        const query = trip.destinationCountry;
        const URL = baseURL+query;
        https.get(URL,(rasp) => {
            let data =  '';
            rasp.on('data', (chunk) => {
                data += chunk
            })
            rasp.on('end', () => {
                const fetchedCountryData = (JSON.parse(data));
                trip.countryData.name = fetchedCountryData[0].name
                trip.countryData.capital = fetchedCountryData[0].capital
                trip.countryData.region = fetchedCountryData[0].subregion
                trip.countryData.population = fetchedCountryData[0].population
                trip.countryData.area = fetchedCountryData[0].area
                trip.countryData.timezones = fetchedCountryData[0].timezones
                trip.countryData.currencies = fetchedCountryData[0].currencies
                trip.countryData.flag = fetchedCountryData[0].flag
                res.redirect('/trips/new')
            })
            rasp.on("error", (err) => {
                console.log("Error: " + err.message)
            })
        })
    }   
});

function fetchCountryData() {
    const baseURL = "https://restcountries.eu/rest/v2/name/";
    const query = trip.destinationCountry;
    const URL = baseURL+query;
    https.get(URL,(rasp) => {
        let data =  '';
        rasp.on('data', (chunk) => {
            data += chunk
        })
        rasp.on('end', () => {
            const fetchedCountryData = (JSON.parse(data));
            trip.countryData.name = fetchedCountryData[0].name
            trip.countryData.capital = fetchedCountryData[0].capital
            trip.countryData.region = fetchedCountryData[0].subregion
            trip.countryData.population = fetchedCountryData[0].population
            trip.countryData.area = fetchedCountryData[0].area
            trip.countryData.timezones = fetchedCountryData[0].timezones
            trip.countryData.currencies = fetchedCountryData[0].currencies
            trip.countryData.flag = fetchedCountryData[0].flag
        })
        rasp.on("error", (err) => {
            console.log("Error: " + err.message)
        })
    })
}

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/?auth=failed");
}


module.exports = router;