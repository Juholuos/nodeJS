const updateWeatherData = require('../../api/weather-api');
const dayjs = require('dayjs');

let result;
console.log('Scheduler running');

function updateResult() {
  let currentTime = dayjs().format('HH:mm')
  result = parseInt(currentTime.slice(3, 10))
  checkTime();
}

const interval = 1000 * 60; // 1 minute
setInterval(() => {
  updateResult()
}, interval)

function checkTime() {
  if (result % 10 === 0) {
    updateWeatherData()
  }
}


