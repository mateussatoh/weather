window.addEventListener("load", () => {
  let lat;
  let lng;
  let location = document.querySelector(".location-timezone");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let footerDescription = document.querySelector(".description");
  let weatherIcon = document.querySelector(".weather-icon");

  let weatherData = document.getElementById("weather-data");

  let body = document.getElementById("body");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      lat = position.coords.latitude;
      lng = position.coords.longitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";

      const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=27190360986b27dd836b0500cabfd2cc&lang=pt_br&units=metric`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const city = data.name;
          const country = data.sys.country;
          const temperatureCelcius = Math.round(data.main.temp);
          const description = data.weather[0].description;
          const icon = data.weather[0].icon;
         
          const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

          const weatherDataColor = {
            "01d": "rgba(90,30,0,0.93)",
            "02d": "rgba(15,80,70,0.8)",
            "03d": "rgba(60,0,60,0.85)",
            "04d": "rgba(48,48,48,0.8)",

            "01n": "rgba(0,40,90,0.8)",
            "02n": "rgba(60,0,60,0.85)",
            "03n": "rgba(48,48,48,0.8)",
            "04n": "rgba(48,48,48,0.8)",

            "09d": "rgba(90,90,90,0.87)",
            "10d": "rgba(0,128,200,0.66)",
            "11d": "rgba(30,0,30,0.8)",
            "13d": "rgba(128,128,128,0.75)",
            "50d": "rgba(10,70,60,0.75)",
          };

          location.textContent = city + " - " + country;
          temperatureDegree.textContent = String(temperatureCelcius) + "°C";
          footerDescription.textContent = description;
          weatherIcon.src = iconURL;

          weatherData.style.backgroundColor = weatherDataColor[`${icon}`];
          console.log(weatherDataColor[`${icon}`]);

          body.style.backgroundImage = `url('./assets/img/${icon}.gif')`;
          console.log(body.style.backgroundImage);
        });
    });
  }
});
