const contentInput = document.querySelector("#content-input");
const nameCountry = document.querySelector("#name-country");
const grade = document.querySelector("#container--grades-grade");
const containerGrades = document.querySelector("#container--grades");
const infoFeelsLike = document.querySelector("#info--felss-like");
const infoDescription = document.querySelector("#info--description");
const infoHumidity = document.querySelector("#info--humidity");
const changeGrades = document.querySelector("#change-grades");

//const API_URL = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

const API_key = "1cc7e95906e6724877adbcf9096bf705";

// Función asíncrona para obtener datos del clima
async function weatherData() {
  const cityInput = contentInput.value;
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${API_key}`;

  try {
    // Realizar la solicitud utilizando fetch y await
    const response = await fetch(API_URL);

    // Verificar si la solicitud fue exitosa (código de estado 200)
    if (!response.ok) {
      throw new Error(`Error de red - Código de estado: ${response.status}`);
    }

    // Parsear la respuesta como JSON
    const data = await response.json();

    // Manipular los datos recibidos
    console.log("Datos del clima:", data);
    // Actualizar la interfaz con los datos recibidos
    showData(data);
  } catch (error) {
    // Manejar errores de red o del servidor
    console.error("Error al obtener datos del clima:", error);
  }
}

// Llamar a la función asíncrona para obtener datos del clima
//weatherData();

contentInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    weatherData();
  }
});

function showData(data) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
  const temperaturaFahrenheit = ((data.main.temp * 9) / 5 - 459.67).toFixed(0);
  const celsiusTemperature = (data.main.temp - 273.15).toFixed(0);
  nameCountry.textContent = `${data.name}, ${data.sys.country}`;
  grade.textContent = `${temperaturaFahrenheit}º F`;
  const iconImage = document.createElement("img");
  iconImage.src = iconUrl;
  iconImage.alt = "Weather Icon";
  // Limpiar el contenido existente
  containerGrades.innerHTML = "";
  containerGrades.appendChild(grade);
  containerGrades.appendChild(iconImage);

  //description
  const temperaturaFahrenheitFeelsLike = (
    (data.main.feels_like * 9) / 5 -
    459.67
  ).toFixed(0);
  const celsiusTemperatureFeelsLike = (data.main.feels_like - 273.15).toFixed(
    0
  );
  infoFeelsLike.textContent = `Feels like: ${temperaturaFahrenheitFeelsLike}º F`;
  infoDescription.textContent = `${data.weather[0].description}`;
  infoHumidity.textContent = `Humidity: ${data.main.humidity}%`;

  changeGrades.addEventListener("click", function () {
    if (
      grade.textContent === `${temperaturaFahrenheit}º F` &&
      infoFeelsLike.textContent ===
        `Feels like: ${temperaturaFahrenheitFeelsLike}º F`
    ) {
      grade.textContent = `${celsiusTemperature}º C`;
      infoFeelsLike.textContent = `Feels like: ${celsiusTemperatureFeelsLike}º C`;
    } else if (
      grade.textContent === `${celsiusTemperature}º C` &&
      infoFeelsLike.textContent ===
        `Feels like: ${celsiusTemperatureFeelsLike}º C`
    ) {
      grade.textContent = `${temperaturaFahrenheit}º F`;
      infoFeelsLike.textContent = `Feels like: ${temperaturaFahrenheitFeelsLike}º F`;
    }
  });
}
