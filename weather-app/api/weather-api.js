const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path')

let dayApiKey = '1fcf47879262ce7681e31f9bec355bb0'
let lat = 61.8699
let lon = 28.87999
let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${dayApiKey}`





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
        const tempCelsius = value.temp.day.toFixed(0);
        let dailyObj = {
          index: index,
          date: date,
          dt: value.dt,
          dayname: dayname,
          tempCelsius: `${tempCelsius}°C`
        };
        dailyData.push(dailyObj);
      }
    });

    // HourlyData
    data.hourly.forEach((value, index) => {
      if(index > 0 && index < 7) {
        const time = dayjs().add(index, 'hour').format('HH:mm')
        let hourlyObj = {
          index: index,
          time: time,
          dt: value.dt,
          tempCelsius: `${value.temp.toFixed(0)}°C`
        }
        hourlyData.push(hourlyObj);
      }
    })

    writeToFile('hourlyData.json', hourlyData)
    writeToFile('dailyData.json', dailyData)
  })
  .catch(error => console.error('Error fetching weather data:', error))
}



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

// setInterval(() => {
//   updateWeatherData()
// }, 60000)

module.exports = updateWeatherData





