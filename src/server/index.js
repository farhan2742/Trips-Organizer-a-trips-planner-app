// Set dependancies

const dotenv                = require('dotenv'),
      express               = require('express'),
      bodyParser            = require('body-parser'),
      cors                  = require('cors'),
      path                  = require('path'),
      methodOverride        = require('method-override'),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      passportLocal         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      expressSession        = require("express-session"),
      apiRoutes             = require("./routes/api"),
      dataRoutes            = require("./routes/data"),
      indexRoutes           = require("./routes/index"),
      tripRoutes            = require("./routes/trip"),
      userRoutes            = require("./routes/user"),
      User                  = require("./models/user").User,
      Trip                  = require("./models/trip").Trip,
      seedDB                = require("./helpers/seeds");


// config dependancies

// dot ENV
dotenv.config();
// Express
const app = express();
app.use(express.static('dist'));
// Method Override
app.use(methodOverride('_method'))
// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// CORS
app.use(cors());

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


// App temp data storage


var trip = {
  title: "",
  departure: "",
  stops: [],
  destination: "",
  destinationCountry: "",
  lat: "",
  lng: "",
  departureDate: "",
  returnDate: "",
  imageURL: "",
  packing: [],
  toDo: [],
  flight: [],
  hotel: [],
  currentWeather: {},
  forcastWeather: [],
  countryData: {}
};


//seedDB();

// Designate routes

app.use("/",apiRoutes);
app.use("/",userRoutes);
app.use("/trips",tripRoutes);
app.use("/",dataRoutes);
app.use(indexRoutes);


// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Example app listening on port 3000!')
});

module.exports = app