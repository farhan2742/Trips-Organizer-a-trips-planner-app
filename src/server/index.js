const dotenv = require('dotenv');
dotenv.config();

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

let projectData = {'trips' : []};
let users = [
  { 
    user : "demo", 
    pass : "demo",
    email : "demo@demo.com"
  }
];

app.post("/fetchCordinates", async (req, res, body) => {
  const title = req.body.title;
  const destination = req.body.destination;
  const departureDate = req.body.departureDate;
  const returnDate = req.body.returnDate;

	geocoder.get('search',{
    q: destination
  })
  .then(function(response){
    const data = {}
    data.title = title;
    data.destination = destination
    data.destinationCountry =response.geonames[0].countryName
    data.lat = response.geonames[0].lat;
    data.lng = response.geonames[0].lng;
    data.departureDate = departureDate;
    data.returnDate = returnDate;
    data.imageURL = "";
    data.currentWeather = []
    data.forcastWeather = []
    projectData.trips.push(data);
    res.redirect(307,'/fetchCurrentWeather')
  })
  .catch(function(error){
    console.log(error);
  });
});


app.post("/fetchCurrentWeather", async (req, res, body) => {
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
      const currentData = {}
      currentData.currentWeatherIcon = currentWeather.data[0].weather.icon
      currentData.currentWeatherDescription = currentWeather.data[0].weather.description
      currentData.currentWeatherWind = currentWeather.data[0].wind_spd
      currentData.currentWeatherTemp = currentWeather.data[0].temp
      currentData.currentWeatherUV = currentWeather.data[0].uv
      currentData.currentWeatherSnow = currentWeather.data[0].snow
      projectData.trips[currentTrip].currentWeather.push(currentData)
      res.redirect(307 ,'/fetchForcastWeather')
    })
    rasp.on("error", (err) => {
      console.log("Error: " + err.message)
    })
  })
});


app.post("/fetchForcastWeather", async (req, res, body) => {
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
      for (var i = 0; i < forcastWeather.data.length; i++) {
        forcastWeatherData = []
        forcastWeatherData.push(forcastWeather.data[i].datetime)
        forcastWeatherData.push(forcastWeather.data[i].weather.icon)
        forcastWeatherData.push(forcastWeather.data[i].weather.description)
        forcastWeatherData.push(forcastWeather.data[i].wind_spd)
        forcastWeatherData.push(forcastWeather.data[i].temp)
        forcastWeatherData.push(forcastWeather.data[i].uv) 
        forcastWeatherData.push(forcastWeather.data[i].snow)
        projectData.trips[currentTrip].forcastWeather.push(forcastWeatherData)
      }
      res.redirect(307,'/fetchDestinationImage')
    })
    rasp.on("error", (err) => {
      console.log("Error: " + err.message)
    })
  })
});

app.post("/fetchDestinationImage", async (req, res, body) => {
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
              res.redirect("back")
            }
            projectData.trips[currentTrip].imageURL = destinationImageCountry.hits[0].webformatURL
             res.redirect("back")
          })
          rasp.on("error", (err) => {
            console.log("Error: " + err.message)
          })
        })
      } else {
        projectData.trips[currentTrip].imageURL = destinationImage.hits[0].webformatURL
        res.redirect("back")
      }
    })
    rasp.on("error", (err) => {
      console.log("Error: " + err.message)
    })
  })
});


app.post("/auth", async (req, res, body) => {
  const userID = req.body.userID;
  const userPassword = req.body.password;
  for (var i = 0; i < users.length; i++) {
    let username = users[i].user;
    let password = users[i].pass;
    if ((userID === username) && (userPassword === password)) {
      res.redirect("/dashboard?auth=success")
    }
  }
  res.redirect("/?auth=failed")
});

app.post('/register', function (req, res) {
    const newUser = {}
    newUser.user = req.body.userID;
    newUser.pass = req.body.password;
    newUser.email = req.body.email;
    users.push(newUser)
    console.log(projectData)
    res.redirect("/?register=success")
});

// Get routes


app.get('/', function (req, res) {
    res.sendFile('dist/index.html' , { root: __dirname + '/../../' })
});


app.get('/dashboard', function (req, res) {
   console.log(req.query)
   if (req.query.auth != "success") {
    res.redirect("/?auth=failed");
   }
   res.sendFile('dist/dashboard.html', { root: __dirname + '/../../' })
});

app.get('/register', function (req, res) {
    res.sendFile('dist/register.html' , { root: __dirname + '/../../' })
});

app.get("/all", sendInfo);

function sendInfo(req, res) {
  res.send(projectData);
}

app.get('*', function (req, res) {
   res.send("ERROR404: Page not found")
});



// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Example app listening on port 3000!')
});
