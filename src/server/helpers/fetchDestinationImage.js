
const   dotenv                = require('dotenv'),
        express               = require('express'),
        https                 = require("https");

// dot ENV
dotenv.config();

function fetchDestinationImage() {
    const baseURL = "https://pixabay.com/api/?";
    const ApiKey = `key=${process.env.PIXABAY_API_KEY}`;
    const query = `&q=${trip.destination}`;
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
                const queryCountry = `&q=${trip.destinationCountry}`;
                const URLCountry = baseURL+ApiKey+queryCountry+options;
                https.get(URLCountry,(rasp) => {
                    let data =  '';
                    rasp.on('data', (chunk) => {
                        data += chunk
                    })
                    rasp.on('end', () => {
                        const destinationImageCountry = (JSON.parse(data));
                        if (destinationImageCountry.hits.length === 0) {
                            trip.imageURL = "";
                        }
                        trip.imageURL = destinationImageCountry.hits[0].webformatURL
                    })
                    rasp.on("error", (err) => {
                        console.log("Error: " + err.message)
                    })
                })
            } else {
                trip.imageURL = destinationImage.hits[0].webformatURL
            }
        })
        rasp.on("error", (err) => {
            console.log("Error: " + err.message)
        })
    })
}

module.exports = fetchDestinationImage;