const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path')

const apiKey = '1fcf47879262ce7681e31f9bec355bb0'
let lat = 61.8699
let lon = 28.87999
let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${apiKey}`
const cityUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`


function getCityName() {
  fetch(cityUrl)
    .then(response => response.json())
    .then(data => {
      const cityName = data[0].name;
      updateLocation(cityName)
    })
    .catch(error => {
      console.error('Error fetching city data:', error)
    })
}



function updateLocation(cityName) {
  const date = dayjs().format('HH:mm, DD.MM.YYYY')
  let locationData = [];

  const locationObj = {
    location: cityName,
    date: date
  }
  locationData.push(locationObj);
  writeToFile('location.json', locationData);
}




// Fetch day data
function updateWeatherData() {
  fetch(url)
  .then(response => response.json())
  .then(data => {
    let dailyData = []; 
    let hourlyData = [];

    // dt for next 7 days
    data.daily.forEach((value, index) => {
      if (index > 0 && index < 7) {
        const date = dayjs().add(index, 'day').format('DD.MM.YYYY')
        // Day name
        const dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
          weekday: "short",
        });
        const maxTemp = `${(value.temp.max).toFixed(0)}°`;
        const minTemp = `${(value.temp.min).toFixed(0)}°`;
        const dayState = value.weather[0].main;
        const icon = value.weather[0].icon;
        let dailyObj = {
          index: index,
          date: date,
          dt: value.dt,
          dayname: dayname,
          maxTemp: maxTemp,
          minTemp: minTemp,
          state: dayState,
          icon: icon
        };
        dailyData.push(dailyObj);
      }
    });

    // HourlyData
    data.hourly.forEach((value, index) => {
      if(index >= 0 && index < 7) {
        const time = dayjs().add(index, 'hour').format('HH:mm')
        const icon = value.weather[0].icon;
        let hourlyObj = {
          index: index,
          time: time,
          dt: value.dt,
          tempCelsius: `${value.temp.toFixed(0)}°`,
          state: value.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`
        }
        hourlyData.push(hourlyObj);
      }
    })

    writeToFile('hourlyData.json', hourlyData)
    writeToFile('dailyData.json', dailyData)
    getCityName();
  })
  .catch(error => console.error('Error fetching weather data:', error))
}

updateWeatherData();

function writeToFile(filename, data) {
  const currentTime = dayjs().format('HH:mm');
  const filePath = path.join(__dirname, '..', 'data', filename);
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
    } else {
      console.log(`${filename} has been written succesfully at ${currentTime}`);
    }
  })
}

module.exports = updateWeatherData





