# Trips-Organizer-a-trips-planner-app
This is a web app that let you plan your future trips effectively.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Node and npm manager
* Geonames API developer account
* Weatherbit API developer account
* Pixabay API developer account
* mongoLab developer account

You need `node` and `npm` installed on your system to be able to run and build this project. 

### Installation

In order to install and run this project follow the below steps

* Go to [Geonames Website](https://www.geonames.org/) and register as a developer for free.
* Go to [Weatherbit Website](https://www.weatherbit.io/) and register as a developer for free.
* Go to [Pixabay](https://pixabay.com/api/docs/) and register as a developer for free.
* Go to [mongoLab](https://mlab.com/) and register as a developer for free.
* Go to [Node Website](https://nodejs.org/en/) and install node server / npm manager on your system.
* Fork or clone this repository and download it to your system.
* Go to downloaded repository and create a file named ".env".
* Edit ".env" with your appID and apiKeys optained from API Website and mongoLab user and password in the following format

```bash
GEONAMES_API_ID=***********************
WEATHERBIT_API_KEY=********************
PIXABAY_API_KEY=***********************
DB_USERNAME =***********************
DB_PASSWORD =***********************
PASSPORT_SECRET =***********************
PORT=3000
IP=localhost
```

* Run following command on terminal/cmd/shell in the project folder

```bash
npm install
```

### Run project in production mode

To start the webpack dev server at port 8080

```bash
  npm run build-dev
```

### Run project in production mode

Generate the dist files and then start server at port 3000

```bash
  npm run build-prod
  npm start
```

### Testing

Testing is done with Jest. To run test, use the command 

```bash
  npm run test
```

## Built With

* [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5) - Front-end markup language
* [SASS](https://sass-lang.com/) - Front-end styling language
* [javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Front-end code bundler
* [Bootstrap 4](https://getbootstrap.com//) - Front-end styleing library
* [Webpack](https://webpack.js.org/) - Front-end built tool
* [Express](https://expressjs.com/) - NodeJS Back-end server
* [MongoDB](https://www.mongodb.com/) - Back-end Database
* [Passport.js](http://www.passportjs.org/) - Back-end server Authentication
* [EJS](https://ejs.co/) - Back-end Templating

## Deployed on

* [Heroku](https://www.heroku.com/) at [Trip Organizer](https://smart-trip-organizer.herokuapp.com/)

## Authors

* [Farhan Kiyani](https://github.com/farhan2742)

