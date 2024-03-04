const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path')
dayjs().format()

let apiKey = '1fcf47879262ce7681e31f9bec355bb0'
let lat = 61.8699
let lon = 28.87999
let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,minutely&appid=${apiKey}`

let weatherData = []; 

fetch(url)
  .then(response => response.json())
  .then(data => {

    let dts = [];
    // dt for next 7 days
    data.daily.forEach((value, index) => {
      if (index > 0) {

        dts.push(value.dt)

        // Day name
        const dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
          weekday: "long",
        });

        const tempCelsius = value.temp.day;

        let weatherObj = {
          index: index,
          dt: value.dt,
          dayname: dayname,
          tempCelsius: tempCelsius
        };

        weatherData.push(weatherObj);
      }
    })
    writeFile(weatherData)
});

const filePath = path.join(__dirname, '..', 'data', 'weatherData.json');

function writeFile(data) {
  fs.writeFile(filePath, JSON.stringify(weatherData), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
      return;
    }
    console.log('weatherData has been written to weatherData.json');
  });
}



    




