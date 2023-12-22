import "./style.css"
const api_key = "446f214866104b408e6193523232012"

const container = document.querySelector("#content")
const data_content = document.querySelector(".data-content")


async function getWeather(searchTerm = "London") {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${searchTerm}&aqi=no`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const meteoData = await response.json();
    const cityName = meteoData.location.name
    data_content.innerHTML = `<p>City name: ${cityName}<br>Temperature: ${meteoData.current.temp_c}°C<br>Condition: ${meteoData.current.condition.text}</p>`;
  } catch (e) {
    console.error("Fetch error: " + e.message);
    data_content.innerHTML = `<p>Error loading data</p>`;
  }
}


function changeCityName() {
  const input = document.querySelector("#cityInput")
  const inputData = input.value
  getWeather(inputData)
}


const changeCityButton = document.querySelector("#searchButton")
changeCityButton.addEventListener("click", changeCityName)




