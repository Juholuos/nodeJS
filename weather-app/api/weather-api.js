const dayjs = require("dayjs");
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc);
const fs = require("fs");
const path = require("path");
const apiKey = "1fcf47879262ce7681e31f9bec355bb0";

let cityName = "new york";
// Capitalize first letter of city name
cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);

let lat;
let lon;

async function updateCoordinates(cityName) {
  const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
  try {
    const response = await fetch(cityUrl);
    const data = await response.json();
    if (data.length > 0) {
      lat = data[0].lat;
      lon = data[0].lon;
      console.log(
        `Coordinates updated for ${cityName}: lat=${lat}, lon=${lon}`
      );
    } else {
      console.log(`City not found ${cityName}`);
    }
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
  }
  getCityName(cityUrl)
}

function getCityName(cityUrl) {
  fetch(cityUrl)
  .then(response => response.json())
  .then(data => {
    updateLocation(cityName, lat, lon)
  })
  .catch(error => {
    console.error('Error fetching city data:', error)
  })
}

// function localTime(timeZoneOffset, index) {

// }

function updateLocation(cityName, lat, lon) {
  const date = dayjs().format("HH:mm, DD.MM.YYYY");
  let locationData = [];
  
  const locationObj = {
    location: cityName,
    date: date,
    lat: lat,
    lon: lon,
  };
  locationData.push(locationObj);
  writeToFile("location.json", locationData);
}

// function getTimeZoneOffset(data) {
//  return data.timezone_offset;
// }

async function fetchWeatherData(cityName) {
  await updateCoordinates(cityName);
  console.log("latlon", lat, lon);
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    let dailyData = [];
    let hourlyData = [];
    // dt for next 7 days
    data.daily.forEach((value, index) => {
      if (index > 0 && index < 7) {
        const date = dayjs().add(index, "day").format("DD.MM.YYYY");
        // Day name
        const dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
          weekday: "short",
        });
        const maxTemp = `${value.temp.max.toFixed(0)}°`;
        const minTemp = `${value.temp.min.toFixed(0)}°`;
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
          icon: icon,
          // timezoneOffset: getTimeZoneOffset(data)
        };
        dailyData.push(dailyObj);
      }
    });
    writeToFile("dailyData.json", dailyData);
    
    // HourlyData
    data.hourly.forEach((value, index) => {
      if (index >= 0 && index < 7) {
        const timeZoneOffset = data.timezone_offset;

        const utcTime = dayjs.utc();
        const localTimeStart = utcTime.add(timeZoneOffset, 'second');
        const localTime = localTimeStart.add(index, 'hour')
        console.log('localTime', localTime.format('HH:mm'));
        
        const icon = value.weather[0].icon;

        let hourlyObj = {
          index: index,
          time: localTime.format('HH:mm'),
          dt: value.dt,
          tempCelsius: `${value.temp.toFixed(0)}°`,
          state: value.weather[0].main,
          icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,
        };
        hourlyData.push(hourlyObj);
      }
    });
    writeToFile("hourlyData.json", hourlyData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
  // updateWeatherData(url);
}

// function updateWeatherData(url) {
//   fetch(url)
//     .then((response) => response.json())
//     .catch((error) => console.error("Error fetching weather data:", error));
// }
  
function writeToFile(filename, data) {
  const currentTime = dayjs().format("HH:mm");
  const filePath = path.join(__dirname, "..", "data", filename);
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) {
      console.error("Error writing to JSON file:", err);
    } else {
      console.log(`${filename} has been written succesfully at ${currentTime}`);
    }
  });
}

fetchWeatherData(cityName);
  
module.exports = {
  fetchWeatherData: fetchWeatherData,
  cityName: cityName
}