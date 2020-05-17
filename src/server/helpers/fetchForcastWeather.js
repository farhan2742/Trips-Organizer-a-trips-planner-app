const   dotenv                = require('dotenv'),
        express               = require('express'),
        https                 = require("https");


function fetchForcastWeather(){
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
        })
            rasp.on("error", (err) => {
            console.log("Error: " + err.message)
        })
    })
};

module.exports = fetchForcastWeather;