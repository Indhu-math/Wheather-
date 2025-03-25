const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    // Default city for initial weather load
    weatherFn('Pune');
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(temp);
        const data = await res.json();

        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('There was an issue with the request. Please try again later.');
    }
}

function weatherShowFn(data) {
    // Updating DOM elements with weather data
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);

    // Use the actual weather icon URL from OpenWeatherMap response
    const iconCode = data.weather[0].icon; // Get the icon code
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`; // URL for the icon

    $('#weather-icon').attr('src', iconUrl); // Set the src for the weather icon

    $('#weather-info').fadeIn();
}
