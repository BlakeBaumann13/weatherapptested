let weather = {
    "apiKey": "a50a6aa72826ea7cb650f0f6a023e931",
    fetchWeather: function(city, state, country){
        fetch(
        "https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        +","
        + state
        +","
        + country
        + "&appid=" + this.apiKey 
        + "&units=imperial"
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){

        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const{ speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
       // document.querySelector(".description").innerText = description;
         document.querySelector(".temperature").innerText = temp + "°F";
         document.querySelector(".humidity").innerText =
         humidity + "%";
        document.querySelector(".wind").innerText =
         speed + " mph";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
        "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value, document.querySelector(".search-bar-state").value, document.querySelector(".search-bar-country").value);
      },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });

  document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

  //weather.fetchWeather("Denver");