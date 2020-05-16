// Set dependancies

const mongoose      = require("mongoose"),
      Trip          = require("../models/trip").Trip,
      User          = require("../models/user").User;

const trips = [
      {
            title: "Europe",
            departure: "Lahore",
            stops: [
                  "Dubai",
                  "Istambul"
            ],
            destination: "Venice",
            destinationCountry: "Italy",
            lat: "42.83333",
            lng: "12.83333",
            departureDate: "2020-05-28",
            returnDate: "2020-05-29",
            imageURL: "https://cdn.pixabay.com/photo/2014/03/03/16/12/cinque-terre-279013_1280.jpg",
            packing: [
                  "Shorts",
                  "Shirts",
                  "Suits"
            ],
            toDo: [
                  "Buy Tickets",
                  "Get Visa",
                  "Get packing"
            ],
            flight: [
                  {
                        flight: "EY 242",
                        confirmation: "LJEIF4",
                        gate: "M",
                        class: "Economy",
                        status: "Confirmed",
                        departure: "Allama Iqbal International Airport, Lahore (LHE)",
                        arival: "Venice Airport Marco Polo (VCE)"
                  }
            ],
            hotel: [
                  {
                        name: "Hotel Mercurio Venice",
                        confirmation: "CM1234567",
                        address: "Calle del Frutarol, 30124, 1848 Venezia VE, Italy",
                        checkin: "9 am",
                        checkout: "12 pm",
                        stay: "1 Night",
                        room: "Economy"
                  }
            ],
            currentWeather: {
                  weatherDate: "2020-05-13T03:09:00",
                  weatherIcon: "c02n",
                  weatherDescription: "Scattered clouds",
                  weatherWind: 1.34,
                  weatherTemp: 14.4,
                  weatherUV: 0,
                  weatherSnow: 0
            },
            forcastWeather: [
                  {
                        weatherDate: "2020-05-13",
                        weatherIcon: "c04d",
                        weatherDescription: "Overcast clouds",
                        weatherWind: 3.08624,
                        weatherTemp: 18.4,
                        weatherUV: 3.44404,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-14",
                        weatherIcon: "c04d",
                        weatherDescription: "Overcast clouds",
                        weatherWind: 2.06558,
                        weatherTemp: 21.3,
                        weatherUV: 6.81155,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-15",
                        weatherIcon: "c04d",
                        weatherDescription: "Overcast clouds",
                        weatherWind: 3.03258,
                        weatherTemp: 18.1,
                        weatherUV: 3.48883,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-16",
                        weatherIcon: "c04d",
                        weatherDescription: "Overcast clouds",
                        weatherWind: 1.74755,
                        weatherTemp: 15.5,
                        weatherUV: 2.98252,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-17",
                        weatherIcon: "r01d",
                        weatherDescription: "Light rain",
                        weatherWind: 2.30218,
                        weatherTemp: 16.7,
                        weatherUV: 3.31244,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-18",
                        weatherIcon: "r03d",
                        weatherDescription: "Heavy rain",
                        weatherWind: 1.2967,
                        weatherTemp: 15.7,
                        weatherUV: 4.25966,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-19",
                        weatherIcon: "r02d",
                        weatherDescription: "Moderate rain",
                        weatherWind: 1.38283,
                        weatherTemp: 11.9,
                        weatherUV: 2.87101,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-20",
                        weatherIcon: "c02d",
                        weatherDescription: "Few clouds",
                        weatherWind: 2.81509,
                        weatherTemp: 14.9,
                        weatherUV: 9.28288,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-21",
                        weatherIcon: "c02d",
                        weatherDescription: "Few clouds",
                        weatherWind: 1.52557,
                        weatherTemp: 16.2,
                        weatherUV: 9.33201,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-22",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 2.08906,
                        weatherTemp: 15.6,
                        weatherUV: 7.44573,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-23",
                        weatherIcon: "c02d",
                        weatherDescription: "Scattered clouds",
                        weatherWind: 2.29294,
                        weatherTemp: 15.2,
                        weatherUV: 4.52675,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-24",
                        weatherIcon: "c02d",
                        weatherDescription: "Scattered clouds",
                        weatherWind: 2.02037,
                        weatherTemp: 16.9,
                        weatherUV: 7.79671,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-25",
                        weatherIcon: "c01d",
                        weatherDescription: "Clear Sky",
                        weatherWind: 2.7036,
                        weatherTemp: 19.6,
                        weatherUV: 9.42815,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-26",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 4.00333,
                        weatherTemp: 20.9,
                        weatherUV: 5.09203,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-27",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 2.4653,
                        weatherTemp: 19,
                        weatherUV: 7.29583,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-28",
                        weatherIcon: "c02d",
                        weatherDescription: "Few clouds",
                        weatherWind: 1.93087,
                        weatherTemp: 17.1,
                        weatherUV: 9.28897,
                        weatherSnow: 0
                  }
            ],
            countryData: {
                  name: "Italy",
                  capital: "Rome",
                  region: "Southern Europe",
                  population: 60665551,
                  area: 301336,
                  timezones: [
                        "UTC+01:00"
                  ],
                  currencies: [
                        "Euro"
                  ],
                  flag: "https://restcountries.eu/data/ita.svg"
            }
      },
      {
            title: "Australia",
            departure: "Lahore",
            stops: [
                  "Dubai",
                  "Frankfort"
            ],
            destination: "Sydney",
            destinationCountry: "Australia",
            lat: "-33.86785",
            lng: "151.20732",
            departureDate: "2020-05-01",
            returnDate: "2020-05-12",
            imageURL: "https://pixabay.com/get/55e3dd424d5aaa14f1dc84609629317a1136d7e1564c704c7d267fdc9148cc59_640.jpg",
            packing: [
                  "Shorts",
                  "Shirts",
                  "Suits"
            ],
            toDo: [
                  "Buy Tickets",
                  "Get Visa",
                  "Get packing"
            ],
            flight: [
                  {
                        flight: "EY 542",
                        confirmation: "LJEIV2",
                        gate: "F",
                        class: "Economy",
                        status: "Confirmed",
                        departure: "Allama Iqbal International Airport, Lahore (LHE)",
                        arival: "Sydney NSW 2020, Australia (SYD)"
                  }
            ],
            hotel: [
                  {
                        name: "Original Backpackers Sydney",
                        confirmation: "ZS1234567",
                        address: "162 Victoria St, Potts Point NSW 2011, Australia",
                        checkin: "9 am",
                        checkout: "12 pm",
                        stay: "11 Days",
                        room: "Single Bed"
                  }
            ],
            currentWeather: {
                  weatherDate: "2020-05-14T19:45:00",
                  weatherIcon: "c01n",
                  weatherDescription: "Clear sky",
                  weatherWind: 4.1,
                  weatherTemp: 12.2,
                  weatherUV: 0,
                  weatherSnow: 0
            },
            forcastWeather: [
                  {
                        weatherDate: "2020-05-15",
                        weatherIcon: "r01d",
                        weatherDescription: "Light rain",
                        weatherWind: 4.15952,
                        weatherTemp: 13.5,
                        weatherUV: 2.95816,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-16",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 2.1764,
                        weatherTemp: 14.9,
                        weatherUV: 3.78422,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-17",
                        weatherIcon: "c02d",
                        weatherDescription: "Scattered clouds",
                        weatherWind: 2.32896,
                        weatherTemp: 14.2,
                        weatherUV: 3.85452,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-18",
                        weatherIcon: "c02d",
                        weatherDescription: "Scattered clouds",
                        weatherWind: 2.1994,
                        weatherTemp: 14.4,
                        weatherUV: 4.31511,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-19",
                        weatherIcon: "c02d",
                        weatherDescription: "Scattered clouds",
                        weatherWind: 2.4469,
                        weatherTemp: 15.2,
                        weatherUV: 3.10728,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-20",
                        weatherIcon: "c04d",
                        weatherDescription: "Overcast clouds",
                        weatherWind: 2.52807,
                        weatherTemp: 15.2,
                        weatherUV: 1.25712,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-21",
                        weatherIcon: "r04d",
                        weatherDescription: "Light shower rain",
                        weatherWind: 2.83995,
                        weatherTemp: 15.2,
                        weatherUV: 1.25712,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-22",
                        weatherIcon: "c04d",
                        weatherDescription: "Overcast clouds",
                        weatherWind: 1.97556,
                        weatherTemp: 14.6,
                        weatherUV: 1.87313,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-23",
                        weatherIcon: "c02d",
                        weatherDescription: "Few clouds",
                        weatherWind: 2.5491,
                        weatherTemp: 15.2,
                        weatherUV: 3.86544,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-24",
                        weatherIcon: "r01d",
                        weatherDescription: "Light rain",
                        weatherWind: 5.45713,
                        weatherTemp: 13.7,
                        weatherUV: 3.44985,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-25",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 5.41328,
                        weatherTemp: 14.8,
                        weatherUV: 2.90858,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-26",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 3.69644,
                        weatherTemp: 13.8,
                        weatherUV: 2.2237,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-27",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 2.3122,
                        weatherTemp: 12.3,
                        weatherUV: 1.40046,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-28",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 3.15565,
                        weatherTemp: 13.6,
                        weatherUV: 1.60538,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-29",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 7.42319,
                        weatherTemp: 15.5,
                        weatherUV: 1.06428,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-30",
                        weatherIcon: "c02d",
                        weatherDescription: "Clear Sky",
                        weatherWind: 3.99073,
                        weatherTemp: 12.4,
                        weatherUV: 3.34549,
                        weatherSnow: 0
                  }
            ],
            countryData: {
                  name: "Australia",
                  capital: "Canberra",
                  region: "Australia and New Zealand",
                  population: 24117360,
                  area: 7692024,
                  timezones: [
                        "UTC+05:00",
                        "UTC+06:30",
                        "UTC+07:00",
                        "UTC+08:00",
                        "UTC+09:30",
                        "UTC+10:00",
                        "UTC+10:30",
                        "UTC+11:30"
                  ],
                  currencies: [
                        "Australian dollar"
                  ],
                  flag: "https://restcountries.eu/data/aus.svg"
            }

      },
      {
            title: "The old Capital",
            departure: "Lahore",
            stops: [
            ],
            destination: "London",
            destinationCountry: "United Kingdom",
            lat: "51.50853",
            lng: "-0.12574",
            departureDate: "2020-05-28",
            returnDate: "2020-05-31",
            imageURL: "https://pixabay.com/get/53e3d5434f57b10ff3d8992cc62e337a1c36dae04e5074417c2b72d69644c2_640.jpg",
            packing: [
                  "Shorts",
                  "Shirts",
                  "Suits"
            ],
            toDo: [
                  "Buy Tickets",
                  "Get Visa",
                  "Get packing"
            ],
            flight: [
                  {
                        flight: "EY 272",
                        confirmation: "LJEIB9",
                        gate: "M",
                        class: "Economy",
                        status: "Confirmed",
                        departure: "Allama Iqbal International Airport, Lahore (LHE)",
                        arival: "Longford TW6, United Kingdom (LHR)"
                  }
            ],
            hotel: [
                  {
                        name: "The Victor Hotel London Victoria",
                        confirmation: "UK1234567",
                        address: "51 Belgrave Rd, Lillington and Longmoore Gardens, London SW1V 2BB, United Kingdom",
                        checkin: "9 am",
                        checkout: "12 pm",
                        stay: "3 Days",
                        room: "Double Bed"
                  }
            ],
            currentWeather: {
                  weatherDate: "2020-05-14T20:51:00",
                  weatherIcon: "c01n",
                  weatherDescription: "Clear sky",
                  weatherWind: 1.79,
                  weatherTemp: 8.3,
                  weatherUV: 0,
                  weatherSnow: 0
            },
            forcastWeather: [
                  {
                        weatherDate: "2020-05-14",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 3.34335,
                        weatherTemp: 10.8,
                        weatherUV: 1.42859,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-15",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 1.38239,
                        weatherTemp: 10.4,
                        weatherUV: 5.19696,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-16",
                        weatherIcon: "c04d",
                        weatherDescription: "Overcast clouds",
                        weatherWind: 2.0393,
                        weatherTemp: 12.8,
                        weatherUV: 3.81775,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-17",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 2.22895,
                        weatherTemp: 14,
                        weatherUV: 5.68426,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-18",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 4.37293,
                        weatherTemp: 14.6,
                        weatherUV: 6.5429,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-19",
                        weatherIcon: "c02d",
                        weatherDescription: "Scattered clouds",
                        weatherWind: 2.34305,
                        weatherTemp: 16.9,
                        weatherUV: 7.11736,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-20",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 4.30127,
                        weatherTemp: 16,
                        weatherUV: 3.99193,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-21",
                        weatherIcon: "r04d",
                        weatherDescription: "Light shower rain",
                        weatherWind: 4.46881,
                        weatherTemp: 14.5,
                        weatherUV: 3.25053,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-22",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 4.62764,
                        weatherTemp: 14.9,
                        weatherUV: 8.13739,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-23",
                        weatherIcon: "r01d",
                        weatherDescription: "Light rain",
                        weatherWind: 8.50042,
                        weatherTemp: 13.8,
                        weatherUV: 2.51985,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-24",
                        weatherIcon: "c02d",
                        weatherDescription: "Scattered clouds",
                        weatherWind: 5.59147,
                        weatherTemp: 15.5,
                        weatherUV: 7.33375,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-25",
                        weatherIcon: "c02d",
                        weatherDescription: "Scattered clouds",
                        weatherWind: 2.52023,
                        weatherTemp: 18.3,
                        weatherUV: 5.76888,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-26",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 2.14017,
                        weatherTemp: 20.6,
                        weatherUV: 4.37091,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-27",
                        weatherIcon: "c03d",
                        weatherDescription: "Broken clouds",
                        weatherWind: 2.42864,
                        weatherTemp: 21.7,
                        weatherUV: 4.21074,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-28",
                        weatherIcon: "c04d",
                        weatherDescription: "Overcast clouds",
                        weatherWind: 1.57487,
                        weatherTemp: 22.2,
                        weatherUV: 3.9659,
                        weatherSnow: 0
                  },
                  {
                        weatherDate: "2020-05-29",
                        weatherIcon: "c02d",
                        weatherDescription: "Scattered clouds",
                        weatherWind: 4.37525,
                        weatherTemp: 17.3,
                        weatherUV: 8.21209,
                        weatherSnow: 0
                  }
            ],
            countryData: {
                  name: "United Kingdom of Great Britain and Northern Ireland",
                  capital: "London",
                  region: "Northern Europe",
                  population: 65110000,
                  area: 242900,
                  timezones: [
                        "UTC-08:00",
                        "UTC-05:00",
                        "UTC-04:00",
                        "UTC-03:00",
                        "UTC-02:00",
                        "UTC",
                        "UTC+01:00",
                        "UTC+02:00",
                        "UTC+06:00"
                  ],
                  currencies: [
                        "British pound"
                  ],
                  flag: "https://restcountries.eu/data/gbr.svg"
            }
      }

]

const seedDB = () => {
      User.remove({}, function (err) {
            if (err) {
                  console.log(err)
            } else {
                  console.log("Removed Users");
                  User.register(new User({username: "demo", email: "demo@demo.com"}), "demo", function(err, user){
                        if (err) {
                              console.log(err);
                        } else {
                              console.log(`Users created`)
                              Trip.remove({}, function(err){
                                    if (err) {
                                          console.log(err)
                                    } else {
                                          for(const trip of trips){
                                                Trip.create(trip, function(err, tripCreated){
                                                      console.log("trips Created")
                                                      User.findOne({ username: "demo" }, function (err, user) {
                                                            if (err) {
                                                                  console.log(err)
                                                            } else {
                                                                  user.trips.push(tripCreated)
                                                                  console.log("trip pushed")
                                                            }
                                                            user.save(function (err, user) {
                                                                  if (err) {
                                                                        console.log(err);
                                                                  } else {
                                                                        console.log("Success");
                                                                  }
                                                            });
                                                                  
                                                            })
                                                      })
                                                }
                                          }
                                    })
                              }      
                        }
                  )
            }
      })
}


module.exports = seedDB;