// Set dependancies

const dotenv                = require('dotenv'),
      express               = require('express'),
      bodyParser            = require('body-parser'),
      cors                  = require('cors'),
      path                  = require('path'),
      GeocoderGeonames      = require('geocoder-geonames'),
//    async                 = require('express-async-await'),
      fetch                 = require('node-fetch'),
      async                 = require('async');
      https                 = require("https"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      passportLocal         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      expressSession        = require("express-session"),
      Trip                  = require("./models/trip").Trip,
      User                  = require("./models/user").User;
      seedDB                = require("./seeds")




// config dependancies

// dot ENV
dotenv.config();
// Express
const app = express();
app.use(express.static('dist'));
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// CORS
app.use(cors());
// Geocoder
const geocoder = new GeocoderGeonames({
	username: process.env.GEONAMES_API_ID
});
// Connect DB

const DBUser = process.env.DB_USERNAME
const DBPass = process.env.DB_PASSWORD
const DBUrl = `mongodb+srv://${DBUser}:${DBPass}@cluster0-kzsic.mongodb.net/trip-organizer?retryWrites=true&w=majority`

mongoose.connect(DBUrl)

// Express Session
app.use(expressSession({
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: false
}))

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//app.set('views', path.join(__dirname, '../client/views'));
//app.set("view engine", "ejs");



// App temp data storage


let projectData = {'trips' : []};


seedDB()

// Post routes

app.post("/trips", (req, res , body) => {
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
  res.redirect(307,'/trips/fetchCordinates?new=true')
});

app.post("/trips/fetchCordinates", (req, res, body) => {
  if (req.query.new === "true") {
    geocoder.get('search',{
      q: projectData.trips[0].destination
    })
    .then(function(response){
      projectData.trips[0].destinationCountry =response.geonames[0].countryName
      projectData.trips[0].lat = response.geonames[0].lat;
      projectData.trips[0].lng = response.geonames[0].lng;
      res.redirect(307,'/trips/fetchCurrentWeather?new=true')
    })
    .catch(function(error){
      console.log(error);
    });
  } 	
});


app.post("/trips/fetchCurrentWeather", (req, res, body) => {
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
        //const currentData = {}
        projectData.trips[currentTrip].currentWeather.currentWeatherDate = currentWeather.data[0].last_ob_time
        projectData.trips[currentTrip].currentWeather.currentWeatherIcon = currentWeather.data[0].weather.icon
        projectData.trips[currentTrip].currentWeather.currentWeatherDescription = currentWeather.data[0].weather.description
        projectData.trips[currentTrip].currentWeather.currentWeatherWind = currentWeather.data[0].wind_spd
        projectData.trips[currentTrip].currentWeather.currentWeatherTemp = currentWeather.data[0].temp
        projectData.trips[currentTrip].currentWeather.currentWeatherUV = currentWeather.data[0].uv
        projectData.trips[currentTrip].currentWeather.currentWeatherSnow = currentWeather.data[0].snow
        //projectData.trips[currentTrip].currentWeather.push(currentData)
        res.redirect(307 ,'/trips/fetchForcastWeather?new=true')
      })
      rasp.on("error", (err) => {
        console.log("Error: " + err.message)
      })
    })
  }
});


app.post("/trips/fetchForcastWeather", (req, res, body) => {
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
        res.redirect(307,'/trips/fetchDestinationImage?new=true')
      })
      rasp.on("error", (err) => {
        console.log("Error: " + err.message)
      })
    })
  }
});

app.post("/trips/fetchDestinationImage", (req, res, body) => {
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
                res.redirect(307 ,'/trips/fetchCountryData?new=true')
              }
              projectData.trips[currentTrip].imageURL = destinationImageCountry.hits[0].webformatURL
               res.redirect(307 ,'/trips/fetchCountryData?new=true')
            })
            rasp.on("error", (err) => {
              console.log("Error: " + err.message)
            })
          })
        } else {
          projectData.trips[currentTrip].imageURL = destinationImage.hits[0].webformatURL
          res.redirect(307 ,'/trips/fetchCountryData?new=true')
        }
      })
      rasp.on("error", (err) => {
        console.log("Error: " + err.message)
      })
    })
  } 
});

app.post("/trips/fetchCountryData", (req, res, body) => {
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

app.post("/trips/save", (req, res, body) =>{
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


app.post("/auth", passport.authenticate("local", {
  successRedirect: "/trips?auth=success",
  failureRedirect: "/?auth=failed"
}) ,(req, res, body) => {
});

app.post('/user', function (req, res) {
  User.register(new User({
    username: req.body.username,
    email: req.body.email
  }), req.body.password, function(err, user) {
    if (err) {
      console.log(err)
      return res.redirect("/?register=failed")
    }
      passport.authenticate("local")(req,res, function(){
        res.redirect("/?register=success")
      })
  });
  
});

// Get routes


app.get('/', (req, res, next) => {
  console.log(users)
  User.find({}, function (err, usersData) {
    if (err) {
      console.log(err)
      res.send(dataToSend);
    }
    else {
      users = usersData;
      res.sendFile('dist/index.html' , { root: __dirname + '/../../' })
    }
  });
  
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect("/");
});

app.get('/user', (req, res) => {
  res.sendFile('dist/register.html' , { root: __dirname + '/../../' })
});

app.get('/trips', isLoggedIn ,(req, res) => {
 res.sendFile('dist/trips.html', { root: __dirname + '/../../' })
});

app.get('/trips/new', isLoggedIn ,(req, res) => {
   res.sendFile('dist/new.html', { root: __dirname + '/../../' })
});

app.get('/trips/:id', isLoggedIn ,(req, res) => {
   res.sendFile('dist/trip.html', { root: __dirname + '/../../' })
});


app.get('/trips/:id/edit', isLoggedIn ,(req, res) => {
   res.sendFile('dist/edit.html', { root: __dirname + '/../../' })
});

app.get("/fetchData", isLoggedIn ,(req, res) => {
  let dataToSend = [];
  User.findOne({ username: req.user.username }, function (err, user) {
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

app.get("/tripData", isLoggedIn ,(req, res) => {
  res.send(projectData.trips);
});


app.get('*', function (req, res) {
   res.send("ERROR404: Page not found")
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/?auth=failed");
}

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Example app listening on port 3000!')
});
