const { writeToFile, hourlyData, dailyData, main } = require('../../api/weather-api')

const interval = 1000 * 60; // 1 minute in milliseconds

setInterval(() => {
  main();
  writeToFile('hourlyData.json', hourlyData);
  writeToFile('dailyData.json', dailyData);
}, interval);