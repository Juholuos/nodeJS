const { fetchWeatherData, cityName } = require('../../api/weather-api');
const dayjs = require('dayjs');
console.log('Scheduler running');
const fs = require('fs');
const path = require('path')
let result;

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
    if (result % 10 === 0) {
      fetchWeatherData(cityName)
    }
  }
}  

runScheduler();




