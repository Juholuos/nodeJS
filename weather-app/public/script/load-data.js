window.onload = async function() {
  console.log('Toimii!');
  await fetch('http://localhost:3000/data/hourlyData.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      data.forEach((date, index) => {
        const dateEl = document.querySelector('.time-header');
        // dateEl.innerHTML = date.localTime;
        if (index === 0) {
          dateEl.innerHTML = date.localTime;
        }

        const hourContainer = document.querySelector('.hour-container');
        const currentDegreeEl = document.querySelector('.current-degree');
        const currentStateEl = document.querySelector('.current-state');
        const currentIcon = document.querySelector('.current-icon')
        const icon = data[0].icon
      
        currentIcon.setAttribute('src', icon)
        currentDegreeEl.innerHTML = data[0].tempCelsius;
        currentStateEl.innerHTML = data[0].state;

        hourContainer.querySelectorAll('.hour').forEach((hour, index) => {
          if (index === date.index - 1) {
            console.log(date.localTime);
            hour.innerHTML = date.localTime.split(",")[0].trim();
          }
        });

        hourContainer.querySelectorAll('.degree-container').forEach((container, index) => {
          if (index === date.index - 1) {
            const iconContainer = container.querySelector('.hourly-icon-container');
            const icon = iconContainer.querySelector('.hourly-icon');
            icon.src = date.icon;
          }  
        });

        hourContainer.querySelectorAll('.degree').forEach((degree, index) => {
          if (index === date.index - 1) {
            degree.innerHTML = date.tempCelsius;
          }  
        });
        
        hourContainer.querySelectorAll('.hour-state').forEach((state, index) => {
          if (index === date.index -1) {
            state.innerHTML = date.state;
          }
        })
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
            day.querySelector('.weekday').innerHTML = date.dayname;
            day.querySelector('.date').innerHTML = (date.date).slice(0, 5)
          }
        });
      });
    });

  await fetch('http://localhost:3000/data/location.json')
    .then(response => response.json())
    .then(data => {
      const cityEl = document.querySelector('.city-header');
      cityEl.innerHTML = `${data[0].location}, ${data[0].country}`;
    }).catch(error => console.error('error fetching', error))
};
