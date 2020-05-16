const   express               = require('express'),
        https                 = require("https");

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

module.exports = fetchCountryData;