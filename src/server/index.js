const dotenv = require('dotenv');
dotenv.config();
let projectData = {};
let path = require('path')
const express = require('express');

const app = express();

const GeocoderGeonames = require('geocoder-geonames');
const geocoder = new GeocoderGeonames({
	username: process.env.GEONAMES_API_ID
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const async  = require('express-async-await');
const fetch = require('node-fetch');
const https = require("https");

app.use(express.static('dist'));

app.set('views', path.join(__dirname, '../client/views'));
app.set("view engine", "ejs");

// Post routes



app.post("/fetchCordinates", async (req, res, body) => {
  const title = req.body.title;
  const destination = req.body.destination;
  const departureDate = req.body.departureDate;
  const returnDate = req.body.returnDate;

	geocoder.get('search',{
    q: destination
  })
  .then(function(response){
  	projectData[title] = {};
  	projectData[title].title = title;
    projectData[title].destination = destination
    projectData[title].destinationCountry =response.geonames[0].countryName
  	projectData[title].lat = response.geonames[0].lat;
  	projectData[title].lng = response.geonames[0].lng;
    projectData[title].departureDate = departureDate;
    projectData[title].returnDate = returnDate;
  	console.log(projectData);
  	console.log("Latest trip: " + projectData[title].title);
  })
  .then(function () {
    const baseURL = "https://api.weatherbit.io/v2.0/current?";
    const ApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
    const lat = `lat=${projectData[title].lat}`;
    const lon = `&lon=${projectData[title].lng}`;
    const URL = baseURL+lat+lon+ApiKey;
    console.log(URL);
     https.get(URL,(rasp) => {
      let data =  '';
      rasp.on('data', (chunk) => {
        data += chunk
      })
      rasp.on('end', () => {
        const currentWeather = (JSON.parse(data));
        const currentWeatherIcon = currentWeather.data[0].weather.icon
        const currentWeatherDescription = currentWeather.data[0].weather.description
        const currentWeatherWind = currentWeather.data[0].wind_spd
        const currentWeatherTemp = currentWeather.data[0].temp
        const currentWeatherUV = currentWeather.data[0].uv
        const currentWeatherSnow = currentWeather.data[0].snow
        projectData[title].currentWeather = {}
        projectData[title].currentWeather.icon = currentWeatherIcon
        projectData[title].currentWeather.description = currentWeatherDescription
        projectData[title].currentWeather.wind = currentWeatherWind
        projectData[title].currentWeather.temp = currentWeatherTemp
        projectData[title].currentWeather.uv = currentWeatherUV
        projectData[title].currentWeather.snow = currentWeatherSnow
      })
      rasp.on("error", (err) => {
        console.log("Error: " + err.message)
      })
    })
  })
  .then(function () {
    const baseURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
    const ApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
    const lat = `lat=${projectData[title].lat}`;
    const lon = `&lon=${projectData[title].lng}`;
    const URL = baseURL+lat+lon+ApiKey;
    console.log(URL);
     https.get(URL,(rasp) => {
      let data =  '';
      rasp.on('data', (chunk) => {
        data += chunk
      })
      rasp.on('end', () => {
        const forcastWeather = (JSON.parse(data));
        projectData[title].forcastWeather = []
        for (var i = 0; i < forcastWeather.data.length; i++) {

          let forcastWeatherIcon = forcastWeather.data[i].weather.icon
          let forcastWeatherDescription = forcastWeather.data[i].weather.description
          let forcastWeatherWind = forcastWeather.data[i].wind_spd
          let forcastWeatherTemp = forcastWeather.data[i].temp
          let forcastWeatherUV = forcastWeather.data[i].uv
          let forcastWeatherSnow = forcastWeather.data[i].snow
          let forcastDate = forcastWeather.data[i].datetime         
          projectData[title].forcastWeather[forcastDate] = [];
          projectData[title].forcastWeather[forcastDate].icon = forcastWeatherIcon
          projectData[title].forcastWeather[forcastDate].description = forcastWeatherDescription
          projectData[title].forcastWeather[forcastDate].wind = forcastWeatherWind
          projectData[title].forcastWeather[forcastDate].temp = forcastWeatherTemp
          projectData[title].forcastWeather[forcastDate].uv = forcastWeatherUV
          projectData[title].forcastWeather[forcastDate].snow = forcastWeatherSnow
          
        }
      })
      rasp.on("error", (err) => {
        console.log("Error: " + err.message)
      })
    })
  })
  .then(function () {
    const baseURL = "https://pixabay.com/api/?";
    const ApiKey = `key=${process.env.PIXABAY_API_KEY}`;
    const query = `&q=${projectData[title].destination}`;
    const options = `&category=places&image_type=photo&safesearch=true}`;
    const URL = baseURL+ApiKey+query+options;
    console.log(URL);
     https.get(URL,(rasp) => {
      let data =  '';
      rasp.on('data', (chunk) => {
        data += chunk
      })
      rasp.on('end', () => {
        const destinationImage = (JSON.parse(data));
        projectData[title].imageURL = destinationImage.hits[0].webformatURL
      })
      rasp.on("error", (err) => {
        console.log("Error: " + err.message)
      })
    })
  })
  .catch(function(error){
    console.log(error);
  });
});


app.post("/fetchCurrentWeather", async (req, res, body) => {
  const baseURL = "https://api.weatherbit.io/v2.0/current?";
    const ApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
    const lat = `lat=${projectData[title].lat}`;
    const lon = `&lon=${projectData[title].lng}`;
    const URL = baseURL+lat+lon+ApiKey;
    const title = req.body.title;
    console.log(URL);
     https.get(URL,(rasp) => {
      let data =  '';
      rasp.on('data', (chunk) => {
        data += chunk
      })
      rasp.on('end', () => {
        //JSON.stringify(data);
        const currentWeather = (JSON.parse(data));
        const currentWeatherIcon = currentWeather.data[0].weather.icon
        const currentWeatherDescription = currentWeather.data[0].weather.description
        const currentWeatherWind = currentWeather.data[0].wind_spd
        const currentWeatherTemp = currentWeather.data[0].temp
        const currentWeatherUV = currentWeather.data[0].uv
        const currentWeatherSnow = currentWeather.data[0].snow
        projectData[title].currentWeather = {}
        projectData[title].currentWeather.icon = currentWeatherDescription
        projectData[title].currentWeather.description = currentWeatherDescription
        projectData[title].currentWeather.wind = currentWeatherWind
        projectData[title].currentWeather.temp = currentWeatherTemp
        projectData[title].currentWeather.uv = currentWeatherUV
        projectData[title].currentWeather.snow = currentWeatherSnow
        console.log();
      })
      rasp.on("error", (err) => {
        console.log("Error: " + err.message)
      })
    })
});


app.post("/fetchForcastWeather", async (req, res, body) => {
  const title = req.body.title;
  const baseURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
  const ApiKey = `&key=${process.env.WEATHERBIT_API_KEY}`;
  const lat = `lat=${projectData[title].lat}`;
  const lon = `&lon=${projectData[title].lng}`;
  const URL = baseURL+lat+lon+ApiKey;
  console.log(URL);
   https.get(URL,(rasp) => {
    let data =  '';
    rasp.on('data', (chunk) => {
      data += chunk
    })
    rasp.on('end', () => {
      const forcastWeather = (JSON.parse(data));
      projectData[title].forcastWeather = []
      for (var i = 0; i < forcastWeather.data.length; i++) {

        let forcastWeatherIcon = forcastWeather.data[i].weather.icon
        let forcastWeatherDescription = forcastWeather.data[i].weather.description
        let forcastWeatherWind = forcastWeather.data[i].wind_spd
        let forcastWeatherTemp = forcastWeather.data[i].temp
        let forcastWeatherUV = forcastWeather.data[i].uv
        let forcastWeatherSnow = forcastWeather.data[i].snow
        let forcastDate = forcastWeather.data[i].datetime         
        projectData[title].forcastWeather[forcastDate] = [];
        projectData[title].forcastWeather[forcastDate].icon = forcastWeatherIcon
        projectData[title].forcastWeather[forcastDate].description = forcastWeatherDescription
        projectData[title].forcastWeather[forcastDate].wind = forcastWeatherWind
        projectData[title].forcastWeather[forcastDate].temp = forcastWeatherTemp
        projectData[title].forcastWeather[forcastDate].uv = forcastWeatherUV
        projectData[title].forcastWeather[forcastDate].snow = forcastWeatherSnow
        
      }
      
    })
    rasp.on("error", (err) => {
      console.log("Error: " + err.message)
    })
  })
});

app.post("/fetchDestinationImage", async (req, res, body) => {
  const title = req.body.title;
  const baseURL = "https://pixabay.com/api/?";
  const ApiKey = `key=${process.env.PIXABAY_API_KEY}`;
  const query = `&q=${projectData[title].destination}`;
  const options = `&category=places&image_type=photo&safesearch=true}`;
  const URL = baseURL+ApiKey+query+options;
  console.log(URL);
   https.get(URL,(rasp) => {
    let data =  '';
    rasp.on('data', (chunk) => {
      data += chunk
    })
    rasp.on('end', () => {
      const destinationImage = (JSON.parse(data));
      projectData[title].imageURL = destinationImage.hits[0].webformatURL
    })
    rasp.on("error", (err) => {
      console.log("Error: " + err.message)
    })
  })
});



// Get routes


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});


app.get('/dashboard', function (req, res) {
   res.sendFile('dist/dashboard.html', { root: __dirname + '/../../' })
});



app.get("/all", sendInfo);

function sendInfo(req, res) {
	res.send(projectData);
}

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Example app listening on port 3000!')
});
