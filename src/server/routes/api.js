const   dotenv                = require('dotenv'),
        express               = require('express'),
        GeocoderGeonames      = require('geocoder-geonames'),
        https                 = require("https"),
        //isLoggedIn            = require("../helpers/isLoggedIn"),
        router                = express.Router();

// dot ENV
dotenv.config();

// Geocoder
const geocoder = new GeocoderGeonames({
	username: process.env.GEONAMES_API_ID
});


router.post("/fetchCordinates", isLoggedIn ,(req, res, body) => {
    if (req.query.new === "true") {
        geocoder.get('search',{
            q: projectData.trips[0].destination
        })
        .then(function(response){
            projectData.trips[0].destinationCountry =response.geonames[0].countryName
            projectData.trips[0].lat = response.geonames[0].lat;
            projectData.trips[0].lng = response.geonames[0].lng;
            res.redirect(307,'/fetchCurrentWeather?new=true')
        })
        .catch(function(error){
            console.log(error);
        });
    } 	
});


router.post("/fetchCurrentWeather", isLoggedIn ,(req, res, body) => {
    if (req.query.new === "true") {
        const currentTrip = projectData.trips.length - 1; 
        const baseURL = "https://api.weatherbit.io/v2.0/current?";
        const ApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
        const lat = `lat=${projectData.trips[currentTrip].lat}`;
        const lon = `&lon=${projectData.trips[currentTrip].lng}`;
        const URL = baseURL+lat+lon+ApiKey;
        https.get(URL,(rasp) => {
            let data =  '';
            rasp.on('data', (chunk) => {
                data += chunk
            })
            rasp.on('end', () => {
                const currentWeather = (JSON.parse(data));
                projectData.trips[currentTrip].currentWeather.currentWeatherDate = currentWeather.data[0].last_ob_time
                projectData.trips[currentTrip].currentWeather.currentWeatherIcon = currentWeather.data[0].weather.icon
                projectData.trips[currentTrip].currentWeather.currentWeatherDescription = currentWeather.data[0].weather.description
                projectData.trips[currentTrip].currentWeather.currentWeatherWind = currentWeather.data[0].wind_spd
                projectData.trips[currentTrip].currentWeather.currentWeatherTemp = currentWeather.data[0].temp
                projectData.trips[currentTrip].currentWeather.currentWeatherUV = currentWeather.data[0].uv
                projectData.trips[currentTrip].currentWeather.currentWeatherSnow = currentWeather.data[0].snow
                res.redirect(307 ,'/fetchForcastWeather?new=true')
            })
            rasp.on("error", (err) => {
                console.log("Error: " + err.message)
            })
        })
    }
});


router.post("/fetchForcastWeather", isLoggedIn ,(req, res, body) => {
    if (req.query.new === "true") {
        const currentTrip = projectData.trips.length - 1; 
        const baseURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
        const ApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
        const lat = `lat=${projectData.trips[currentTrip].lat}`;
        const lon = `&lon=${projectData.trips[currentTrip].lng}`;
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
                forcastWeatherData.forcastWeatherDate = forcast.datetime
                forcastWeatherData.forcastWeatherIcon = forcast.weather.icon
                forcastWeatherData.forcastWeatherDescription = forcast.weather.description
                forcastWeatherData.forcastWeatherWind = forcast.wind_spd
                forcastWeatherData.forcastWeatherTemp = forcast.temp
                forcastWeatherData.forcastWeatherUV = forcast.uv
                forcastWeatherData.forcastWeatherSnow = forcast.snow
                projectData.trips[currentTrip].forcastWeather.push(forcastWeatherData)
            }
                res.redirect(307,'/fetchDestinationImage?new=true')
            })
                rasp.on("error", (err) => {
                console.log("Error: " + err.message)
            })
        })
    }
});

router.post("/fetchDestinationImage", isLoggedIn ,(req, res, body) => {
    if (req.query.new === "true") {
        const currentTrip = projectData.trips.length - 1;
        const baseURL = "https://pixabay.com/api/?";
        const ApiKey = `key=${process.env.PIXABAY_API_KEY}`;
        const query = `&q=${projectData.trips[currentTrip].destination}`;
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
                    const queryCountry = `&q=${projectData.trips[currentTrip].destinationCountry}`;
                    const URLCountry = baseURL+ApiKey+queryCountry+options;
                    https.get(URLCountry,(rasp) => {
                        let data =  '';
                        rasp.on('data', (chunk) => {
                            data += chunk
                        })
                        rasp.on('end', () => {
                            const destinationImageCountry = (JSON.parse(data));
                            if (destinationImageCountry.hits.length === 0) {
                                projectData.trips[currentTrip].imageURL = "";
                                res.redirect(307 ,'/fetchCountryData?new=true')
                            }
                            projectData.trips[currentTrip].imageURL = destinationImageCountry.hits[0].webformatURL
                            res.redirect(307 ,'/fetchCountryData?new=true')
                        })
                        rasp.on("error", (err) => {
                            console.log("Error: " + err.message)
                        })
                    })
                } else {
                    projectData.trips[currentTrip].imageURL = destinationImage.hits[0].webformatURL
                    res.redirect(307 ,'/fetchCountryData?new=true')
                }
            })
            rasp.on("error", (err) => {
                console.log("Error: " + err.message)
            })
        })
    } 
});

router.post("/fetchCountryData", isLoggedIn ,(req, res, body) => {
    if (req.query.new === "true") {
        const currentTrip = projectData.trips.length - 1; 
        const baseURL = "https://restcountries.eu/rest/v2/name/";
        const query = projectData.trips[0].destinationCountry;
        const URL = baseURL+query;
        https.get(URL,(rasp) => {
            let data =  '';
            rasp.on('data', (chunk) => {
                data += chunk
            })
            rasp.on('end', () => {
                const fetchedCountryData = (JSON.parse(data));
                projectData.trips[currentTrip].countryData.name = fetchedCountryData[0].name
                projectData.trips[currentTrip].countryData.capital = fetchedCountryData[0].capital
                projectData.trips[currentTrip].countryData.region = fetchedCountryData[0].subregion
                projectData.trips[currentTrip].countryData.population = fetchedCountryData[0].population
                projectData.trips[currentTrip].countryData.area = fetchedCountryData[0].area
                projectData.trips[currentTrip].countryData.timezones = fetchedCountryData[0].timezones
                projectData.trips[currentTrip].countryData.currencies = fetchedCountryData[0].currencies
                projectData.trips[currentTrip].countryData.flag = fetchedCountryData[0].flag
                res.redirect('/trips/new')
            })
            rasp.on("error", (err) => {
                console.log("Error: " + err.message)
            })
        })
    }   
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/?auth=failed");
}


module.exports = router;