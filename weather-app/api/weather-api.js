const request = require('request');
const argv = require('yargs').argv;

const dayjs = require('dayjs');
dayjs().format()

let apiKey = '90c8e783d8cfa201bfc850f6d773f546'
let city = argv.c || 'savonlinna';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

// request(url, function(err, response, body) {
//   if(err) {
//     console.log('error:', error);
//   } else {
//     let weather = JSON.parse(body)

//     let message = `${weather.main.temp} celsiusastetta paikkakunnalla ${weather.name}!`;
//     console.log(message);
//   }
// });



fetch(url)
  .then(response => response.json())
  .then(data => {
    const location = data.name;
    
    
  })