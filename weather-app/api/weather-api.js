const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path')
dayjs().format()

let dayApiKey = '1fcf47879262ce7681e31f9bec355bb0'
let lat = 61.8699
let lon = 28.87999
let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${dayApiKey}`


let dailyData = []; 

// Fetch day data
fetch(url)
  .then(response => response.json())
  .then(data => {
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
    })
    writeDailyFile(dailyData)
});

const dailyFilePath = path.join(__dirname, '..', 'data', 'dailyData.json');

// Write to file
function writeDailyFile(dailyData) {
  fs.writeFile(dailyFilePath, JSON.stringify(dailyData), (err) => {
    if (err) {
      console.error('Error writing to JSON file:', err);
      return;
    }
    console.log('dailyData has been written to dailyData.json');
  });
}

let hourlyData = [];

fetch(url)
  .then(response => response.json())
  .then(data => {
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
    writeHourlyData(hourlyData)
  })

const hourlyFilePath = path.join(__dirname, '..', 'data', 'hourlyData.json');

//write to file
function writeHourlyData(hourlyData) {
  fs.writeFile(hourlyFilePath, JSON.stringify(hourlyData), (err) => {
    if (err) {
      console.error('Error:', err)
      return
    }
    console.log('hourlyData has been written to dailyData.json');
  })
}



