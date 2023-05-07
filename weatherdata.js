document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("search-form");
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const city = document.getElementById("city").value;
      const state = document.getElementById("state").value;
      const country = document.getElementById("country").value;
  
      const apiKey = "a50a6aa72826ea7cb650f0f6a023e931";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${state},${country}&appid=${apiKey}&units=imperial`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        const forecastElement = document.getElementById("forecast");
  
        // clear any previous forecast items
        forecastElement.innerHTML = "";
  
        for (let i = 0; i < data.list.length; i += 8) {
          const forecast = data.list[i];
          const date = new Date(forecast.dt_txt);
          const icon = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
          const temp = Math.round(forecast.main.temp);
  
          const forecastItem = document.createElement("div");
          forecastItem.classList.add("forecast-item");
  
          const dateElement = document.createElement("div");
          dateElement.classList.add("date");
          dateElement.innerText = date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });
  
          const iconElement = document.createElement("img");
          iconElement.classList.add("icon");
          iconElement.setAttribute("src", icon);
  
          const tempElement = document.createElement("div");
          tempElement.classList.add("temp");
          tempElement.innerHTML = `${temp}&deg;F`;
  
          forecastItem.appendChild(dateElement);
          forecastItem.appendChild(iconElement);
          forecastItem.appendChild(tempElement);
  
          forecastElement.appendChild(forecastItem);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
  