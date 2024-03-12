const apiKey = '1fcf47879262ce7681e31f9bec355bb0'
const city = 'Moscow'
const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`

function getCoordinates() {
  return fetch(url)
    .then(res => res.json())
    .then(data => {
      const lat =  data[0].lat;
      const lon = data[0].lon
  
      const coordinates = {
        lat: lat,
        lon: lon
      }
    
      return coordinates;
    })
}

module.exports = getCoordinates;



