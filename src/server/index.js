const dotenv = require('dotenv');
dotenv.config();
let projectData = {};
let path = require('path')
const express = require('express')

const app = express()

const GeocoderGeonames = require('geocoder-geonames')
const geocoder = new GeocoderGeonames({
	username: process.env.GEONAMES_API_ID,
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());
const async  = require('express-async-await')
const fetch = require('node-fetch')

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html', { root: __dirname + '/..' })
});


// Post routes



app.post("/getCordinates", async (req, res, body) => {
	geocoder.get('search',{
    q: req.body.place
  })
  .then(function(response){
  	projectData[req.body.place] = {};
  	projectData[req.body.place].city = req.body.place;
  	projectData[req.body.place].lat = response.geonames[0].lat;
  	projectData[req.body.place].lng = response.geonames[0].lng;
  	console.log(projectData);
  	console.log("Latest trip: " + projectData[req.body.place].city);
  })
  .catch(function(error){
    console.log(error);
  });
});

// Get routes

app.get("/all", sendInfo);

function sendInfo(req, res) {
	res.send(projectData);
}

// designates what port the app will listen to for incoming requests
app.listen(process.env.PORT, process.env.IP, function () {
    console.log('Example app listening on port 3000!')
});
