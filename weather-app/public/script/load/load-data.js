window.onload = async function () {
  console.log("Toimii!");
  await fetch("http://localhost:3000/data/hourlyData.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((date, index) => {
        const dateEl = document.querySelector(".time-header");
        if (index === 0) {
          dateEl.innerHTML = date.localTime;
        }

        const hourContainer = document.querySelector(".hour-container");
        const currentDegreeEl = document.querySelector(".current-degree");
        const currentStateEl = document.querySelector(".current-state");
        const currentIcon = document.querySelector(".current-icon");
        const icon = data[0].icon;

        currentIcon.setAttribute("src", icon);
        currentDegreeEl.innerHTML = data[0].tempCelsius;
        currentStateEl.innerHTML = data[0].state;

        hourContainer.querySelectorAll(".hour").forEach((hour, index) => {
          if (index === date.index - 1) {
            hour.innerHTML = date.localTime.split(",")[0].trim();
          }
        });

        hourContainer
          .querySelectorAll(".degree-container")
          .forEach((container, index) => {
            if (index === date.index - 1) {
              const iconContainer = container.querySelector(
                ".hourly-icon-container"
              );
              const icon = iconContainer.querySelector(".hourly-icon");
              icon.src = date.icon;
            }
          });

        hourContainer.querySelectorAll(".degree").forEach((degree, index) => {
          if (index === date.index - 1) {
            degree.innerHTML = date.tempCelsius;
          }
        });

        hourContainer
          .querySelectorAll(".hour-state")
          .forEach((state, index) => {
            if (index === date.index - 1) {
              state.innerHTML = date.state;
            }
          });
      });
    });
    
  /*----------------------------------------------------*/

  await fetch("http://localhost:3000/data/dailyData.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((date) => {
        const dayContainer = document.querySelector(".day-container");
        dayContainer
          .querySelectorAll(".day-degree")
          .forEach((degree, index) => {
            if (index === date.index - 2) {
              degree.querySelector(".day-top").innerHTML = date.maxTemp;
              degree.querySelector(".day-low").innerHTML = date.minTemp;
              degree.querySelector(".day-state").innerHTML = date.state;
            }
          });
        dayContainer.querySelectorAll(".day").forEach((day, index) => {
          if (index === date.index - 2) {
            day.querySelector(".weekday").innerHTML = date.dayname;
            day.querySelector(".date").innerHTML = date.date.slice(0, 5);
          }
        });
      });
    });

  /*----------------------------------------------------*/

  await fetch("http://localhost:3000/data/location.json")
    .then((response) => response.json())
    .then((data) => {
      const cityEl = document.querySelector(".city-header");
      cityEl.innerHTML = `${data[0].location}, ${data[0].country}`;
    })
    .catch((error) => console.error("error fetching", error));

  /*----------------------------------------------------*/

  await fetch("http://localhost:3000/data/infoData.json")
    .then((response) => response.json())
    .then((dataArray) => {
      const data1 = dataArray[0];

      // Today max temp
      const todayMax = document.querySelector(".today-max");
      todayMax.innerHTML = `${data1.todayMax.toFixed(0)}° `;

      // Today min temp
      const todayMin = document.querySelector(".today-min");
      todayMin.innerHTML = ` ${data1.todayMin.toFixed(0)}°`;

      // Today rain
      const todayRain = document.querySelector(".today-rain");
      if (data1.todayRain === undefined) {
        todayRain.innerHTML = "0mm";
      } else {
        todayRain.innerHTML = `${data1.todayRain}`;
      }

      // Today wind
      const todayWind = document.querySelector(".today-wind");
      todayWind.innerHTML = ` ${data1.todayWind.toFixed(0)}m/s`;

      const todayHumidity = document.querySelector(".today-humidity");
      todayHumidity.innerHTML = ` ${data1.todayHumidity}%`;

      const data2 = dataArray[1];

      // tomorow max temp
      const tomorrowMax = document.querySelector(".tomorrow-max");
      tomorrowMax.innerHTML = `${data2.tomorrowMax.toFixed(0)}° `;

      // tomorrow min temp
      const tomorrowMin = document.querySelector(".tomorrow-min");
      tomorrowMin.innerHTML = ` ${data2.tomorrowMin.toFixed(0)}°`;

      // tomorrow rain
      const tomorrowRain = document.querySelector(".tomorrow-rain");
      if (data2.todayRain === undefined) {
        tomorrowRain.innerHTML = "0mm";
      } else {
        tomorrowRain.innerHTML = `${data2.tomorrowRain}`;
      }

      // tomorrow wind
      const tomorrowWind = document.querySelector(".tomorrow-wind");
      tomorrowWind.innerHTML = ` ${data2.tomorrowWind.toFixed(0)}m/s`;

      const tomorrowHumidity = document.querySelector(".tomorrow-humidity");
      tomorrowHumidity.innerHTML = ` ${data2.tomorrowHumidity}%`;
    });
  
  /*----------------------------------------------------*/

  await fetch("http://localhost:3000/data/dates.json")
  .then((response) => response.json())
  .then(data => {
    const infoHeaderEls = document.querySelectorAll('.info-header');
    infoHeaderEls[0].innerHTML = `Today (${data[0].split('-')[1]})`
    infoHeaderEls[1].innerHTML = `Tomorrow (${data[1].split('-')[1]})`
  })
};
