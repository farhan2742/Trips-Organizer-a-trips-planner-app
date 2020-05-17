const   dotenv                = require('dotenv'),
        express               = require('express'),
        https                 = require("https");

// dot ENV
dotenv.config();

const fetchCurrentWeather = () => {
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
        })
        rasp.on("error", (err) => {
            console.log("Error: " + err.message)
        })
    })
}

module.exports = fetchCurrentWeather;