window.onload = async function() {
  console.log('Toimii!');
  
  await fetch('http://localhost:3000/data/hourlyData.json')
    .then(response => response.json())
    .then(data => {
      data.forEach(date => {
        const hourContainer = document.querySelector('.hour-container');
        const currentDegreeEl = document.querySelector('.current-degree');
        const currentStateEl = document.querySelector('.current-state');
        currentDegreeEl.innerHTML = date.tempCelsius;
        currentStateEl.innerHTML = date.state;
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
            degree.querySelector('.day-top').innerHTML = date.maxTemp;
            degree.querySelector('.day-low').innerHTML = date.minTemp;
            degree.querySelector('.day-state').innerHTML = date.state;          }
        });
        dayContainer.querySelectorAll('.day').forEach((day, index) => {
          if (index === date.index - 1) {
            day.innerHTML = date.dayname;
          }
        });
      });
    });

  await fetch('http://localhost:3000/data/location.json')
    .then(response => response.json())
    .then(data => {
      const cityEl = document.querySelector('.city-header');
      const dateEl = document.querySelector('.time-header');
      cityEl.innerHTML = data[0].location;
      dateEl.innerHTML = data[0].date;
    }).catch(error => console.error('error fetching', error))
};
