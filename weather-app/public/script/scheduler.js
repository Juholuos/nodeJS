const updateWeatherData = require('../../api/weather-api');
const dayjs = require('dayjs');

let result;

function updateResult() {
  let currentTime = dayjs().format('HH:mm')
  // console.log(currentTime);
  result = parseInt(currentTime.slice(3, 10))
  console.log(currentTime, result);
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


