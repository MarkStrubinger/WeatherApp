require('dotenv').config()
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

const app = express();

// bodyParser is used to pull and use client text submission from the body of an html
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));

// app.get when a get request is sent from the browser to the server for the / root page
app.get("/", function(req, res){

// response sends ejs page template
  res.render("main");
});



// app.post is used to collect the post information from the client to the server
app.post("/", function(req, res){
  const today = new Date();
  const nameDay = today.toLocaleString('default', { weekday: 'long' });
  const day = today.getDate();
  var month = today.toLocaleString('default', { month: 'long' });
  var superscript = "";
  var time = today.toLocaleString('default', { hour: 'numeric', minute: 'numeric', hour12: true })

  if (day == 1) {
    var superscript = "st";
  } else if (day == 2) {
    var superscript = "nd";
  } else if (day == 3) {
    var superscript = "rd";
  } else {
    var superscript = "th";
  }

// variables that are used to concatenate the url sent to the api to retrieve data
// from the post request, query looks into the body for the input with the name cityName
  const query = req.body.cityName;
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid="+ process.env.APIKEY + "&units=" + units;

// https.get is used to get information from the api, using the url from above as an input
  https.get(url, function(response){
    // checks status code within the response in command line for debugging
    console.log(response.statusCode);

    // from the response, name the event "data", and attach it to a callback function
    response.on("data", function(data){
      // change the data received in the response into a JSON format
      const weatherData = JSON.parse(data);
      // grabs temperature from response data
      const weatherTemp = Math.round(weatherData.main.temp);
      // grabs realfeel temperature from response data
      const weatherFeelsLike = Math.round(weatherData.main.feels_like);
      // grabs weather description from response data
      const weatherDescription = weatherData.weather[0].description;
      // grabs location from response data
      const weatherLocation = weatherData.name;
      // grabs image code from response data
      const iconAPI = weatherData.weather[0].icon;
      // checks icon and prepares correct svg asset from files
      var weatherIcon = "/images/sun.svg";
      // with concatenation creates an html image url that adjusts based on the icon data
      var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";

      if (iconAPI == "01d") {
        var weatherIcon = "images/sun.svg";
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("sun", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else if (iconAPI == "01n") {
        var weatherIcon = "images/moon.svg"
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("moon", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else if (iconAPI == "02d") {
        var weatherIcon = "images/cloud-sun.svg"
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("sun", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else if (iconAPI == "02n") {
        var weatherIcon = "images/cloud-moon.svg"
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("moon", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else if (iconAPI == "03d" || iconAPI == "03n") {
        var weatherIcon = "images/cloud.svg"
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("cloudy", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else if (iconAPI == "04d" || iconAPI == "04n") {
        var weatherIcon = "images/clouds.svg"
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("cloudy", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else if (iconAPI == "09d" || iconAPI == "09n") {
        var weatherIcon = "images/cloud-rain-heavy.svg"
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("rain", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else if (iconAPI == "10d" || iconAPI == "10n") {
        var weatherIcon = "images/cloud-rain.svg"
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("rain", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else if (iconAPI == "11d" || iconAPI == "11n") {
        var weatherIcon = "images/cloud-lightning-rain.svg"
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("rain", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else if (iconAPI == "13d" || iconAPI == "13n") {
        var weatherIcon = "images/snow.svg"
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("snow", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else if (iconAPI == "50d" || iconAPI == "50n") {
        var weatherIcon = "images/cloud-fog2.svg"
        var weatherImage = "<img class='drop-shadow-lg mx-auto fill-slate-100' alt='" + weatherDescription + "'" + "src=" + weatherIcon + ">";
        res.render("snow", {
          date: today,
          day: nameDay,
          numday: day,
          month: month,
          superscript: superscript,
          time: time,
          temperature: weatherTemp,
          realTemp: weatherFeelsLike,
          description: weatherDescription,
          location: weatherLocation,
          image: weatherImage
        });
      } else {
        res.render("main");
      }
    });
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started successfully.");
});
