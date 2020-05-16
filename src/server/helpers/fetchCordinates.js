const   dotenv                = require('dotenv'),
        express               = require('express'),
        GeocoderGeonames      = require('geocoder-geonames');

// dot ENV
dotenv.config();

// Geocoder
const geocoder = new GeocoderGeonames({
username: process.env.GEONAMES_API_ID
});


function fetchCordinates() {
    geocoder.get('search',{
        q: trip.destination
    })
    .then(function(response){
        trip.destinationCountry =response.geonames[0].countryName
        trip.lat = response.geonames[0].lat;
        trip.lng = response.geonames[0].lng;
    })
    .catch(function(error){
        console.log(error);
    });
}

module.exports = fetchCordinates;
