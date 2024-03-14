const { fetchWeatherData, cityName, locationData } = require('../../api/weather-api');
const dayjs = require('dayjs');
let result;
console.log('Scheduler running');

// Tiedosto ottaa citynamen vain tallennushetkellä weather-apista.
// Testaa ottaa cityname päivitetystä objektista, äläkä suoraan tiedostosta

function runScheduler() {
  function updateResult() {
    let currentTime = dayjs().format('HH:mm')
    result = parseInt(currentTime.slice(3, 10))
    checkTime();
  }
  
  const interval = 1000 * 60; // 1 minute
  setInterval(() => {
    updateResult()
  }, interval)
  
  // update every 10 minutes
  function checkTime() {
    if (result % 1 === 0) {
      fetchWeatherData(cityName)
    }
  }
}  

runScheduler();



