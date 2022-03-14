const app = {
  init: () => {
    document
      .getElementById("getWeather")
      .addEventListener("click", app.getWeather);
    document
      .getElementById("getLocation")
      .addEventListener("click", app.getLocation);
  },
  getWeather: () => {
    let lat = document.getElementById("latitudeinput").value;
    let lon = document.getElementById("longitudeinput").value;
    let apiKey = "0dbdfa99d6ff01aa7ca46db4934594e7";
    let language = "en";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${language}`;

    //fetching area :-)

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw (
            new Error(response.statusText) &&
            alert("Please enter a Valid location")
          );
        } else return response.json();
      })
      .then((data) => app.showWeather(data))
      .catch(console.err);
  },
  getLocation: () => {
    let lat = document.getElementById("latitudeinput").value;
    let lon = document.getElementById("longitudeinput").value;
    let apiKey = "0dbdfa99d6ff01aa7ca46db4934594e7";
    let language = "en";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${language}`;

    let apiUrl2 = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${language}`;

    //fetching area :-)

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw (
            new Error(response.statusText) &&
            alert("Please enter a Valid location")
          );
        } else return response.json();
      })
      .then((data) => app.showLocation(data))
      .catch(console.err);
  },
  success: () => {
    document.getElementById("latitudeinput").value =
      position.coords.latitude.toFixed(2);
    document.getElementById("longitudeinput").value =
      position.coords.longitude.toFixed(2);
  },
  error: () => {
    console.error();
  },
  showWeather: (response) => {
    console.log(response);

    let row = document.querySelector(".weather");

    row.innerHTML = response.daily
      .map((day, index) => {
        if (index <= 6) {
          let date = new Date(day.dt * 1000);
          let sunrise = new Date(day.sunrise * 1000).toTimeString();
          let sunset = new Date(day.sunset * 1000).toTimeString();

          return `
          <div class="m-4 border-2 border-black">
          <div id="outercard"
      class="flex flex-col items-center p-8 text-black"
      
    >
      <div class="flex flex-col items-center bg-stone-500" id="">
        <h1 class="font-bold">${date.toDateString()}</h1>

        <img src="http://openweathermap.org/img/wn/${
          day.weather[0].icon
        }@4x.png" class="my-6" alt=${day.weather[0].description}/>
      </div>
    </div>

              <div
                id="innercard"
                class="grid grid-cols-2 grid-rows-11 items-start p-4  font-bold m-8 text-white"
              >

                <h1 class="my-2 text-black">Weather</h1>

                <h1 class="my-2">${day.weather[0].main}</h1>

                <h1 class="my-2 text-black">Highs and Lows</h1>

                <h1 class="my-2">${day.temp.max}°C - ${day.temp.min}°C</h1>

                <h1 class="my-2 text-black">High Feels Like</h1>

                <h1 class="my-2">${day.feels_like.day}°C</h1>

                <h1 class="my-2 text-black">Pressure</h1>

                <h1 class="my-2">${day.pressure} mb</h1>

                <h1 class="my-2 text-black">Humidity</h1>

                <h1 class="my-2">${day.humidity}%</h1>

                <h1 class="my-2 text-black">UV Index</h1>

                <h1 class="my-2">${day.uvi}</h1>

                <h1 class="my-2 text-black">Precipitation:</h1>

                <h1 class="my-2">${day.pop * 100}%</h1>

                <h1 class="my-2 text-black">Dew Point:</h1>

                <h1 class="my-2">${day.dew_point}</h1>

                <h1 class="my-2 text-black">Wind Speed and Direction:</h1>

                <h1 class="my-2">${day.wind_speed}m/s, ${day.wind_deg}°</h1>

                <h1 class="my-2 text-black">Sunrise:</h1>

                <h1 class="my-2">${sunrise}</h1>

                <h1 class="my-2 text-black">Sunset:</h1>

                <h1 class="my-2">${sunset}</h1>
              </div>
              
              </div>`;
        }
      })
      .join(" ");
  },
  showLocation: (response) => {
    console.log(response);

    let row = document.querySelector(".location");

    row.innerHTML = response.timezone;
  },
};

app.init();
