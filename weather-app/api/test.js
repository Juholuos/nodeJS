const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');
const apiKey = '1fcf47879262ce7681e31f9bec355bb0';

let lat = 12;
let lon = 31;

async function updateCoordinates(cityName) {
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    
    try {
        const response = await fetch(cityUrl);
        const data = await response.json();
        
        if (data.length > 0) {
            lat = data[0].lat;
            lon = data[0].lon;
            
            console.log(`Coordinates updated for ${cityName}: lat=${lat}, lon=${lon}`);
        } else {
            console.log(`City not found: ${cityName}`);
        }
    } catch (error) {
        console.error('Error fetching city coordinates:', error);
    }
}

async function fetchWeatherData(cityName) {
    await updateCoordinates(cityName);
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=${apiKey}`;

    // Now use the updated lat and lon to fetch weather data
    try {
        const response = await fetch(url);
        const weatherData = await response.json();
        
        // Process weather data here
        // console.log('Weather data:', weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Example usage
fetchWeatherData('New York');
