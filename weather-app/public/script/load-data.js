window.onload = async function() {
  console.log('Toimii!');
  
  await fetch('http://localhost:3000/data/hourlyData.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(date => {
        const hourContainer = document.querySelector('.hour-container');
        hourContainer.querySelectorAll('.degree').forEach((degree, index) => {
          if (index === date.index - 1) {
            degree.innerHTML = date.tempCelsius;
          }
        });
        hourContainer.querySelectorAll('.hour').forEach((hour, index) => {
          if (index === date.index - 1) {
            hour.innerHTML = date.time;
          }
        });
      });
    });

  await fetch('http://localhost:3000/data/dailyData.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(date => {
        const dayContainer = document.querySelector('.day-container');
        dayContainer.querySelectorAll('.day-degree').forEach((degree, index) => {
          if (index === date.index - 1) {
            degree.innerHTML = date.tempCelsius;
          }
        });
        dayContainer.querySelectorAll('.day').forEach((day, index) => {
          if (index === date.index - 1) {
            day.innerHTML = date.dayname;
          }
        });
      });
    });
};
