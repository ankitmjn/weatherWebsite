const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '63bc4b9bc48f37daf4cabbd73933281c';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `The temperature is ${weather.main.temp} degrees farheneit in ${weather.name} right now!
        The high for today is projected to be ${weather.main.temp_max} degrees and the
        the low for today will be ${weather.main.temp_min} degrees. 
         The humidity today should be around ${weather.main.humidity}%
        and the pressure today will be at ${weather.main.pressure} Pascals.
        Last but not the least the wind speed will reach speeds as much as ${weather.wind.speed} miles/hour today.`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})