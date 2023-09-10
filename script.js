document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "190805b16380593ed92fb42b919a5c1a"; // Replace with your API key
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

    const cityInput = document.getElementById("cityInput");
    const searchButton = document.getElementById("searchButton");
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const conditionsElement = document.getElementById("conditions");
    const errorMessage = document.getElementById("errorMessage");
    const weatherInfo = document.querySelector(".weather-info");

    searchButton.addEventListener("click", function () {
        const cityName = cityInput.value.trim();
        if (cityName === "") {
            errorMessage.textContent = "Please enter a city name.";
            weatherInfo.style.display = "none";
            return;
        }

        fetch(`${apiUrl}?q=${cityName}&appid=${apiKey}&units=metric`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("City not found or API request issue");
                }
                return response.json();
            })
            .then((data) => {
                errorMessage.textContent = "";
                locationElement.textContent = data.name;
                temperatureElement.textContent = data.main.temp;
                conditionsElement.textContent = data.weather[0].description;
                weatherInfo.style.display = "block";
            })
            .catch((error) => {
                errorMessage.textContent = `Error: ${error.message}`;
                locationElement.textContent = "";
                temperatureElement.textContent = "";
                conditionsElement.textContent = "";
                weatherInfo.style.display = "none";
            });
    });
});
