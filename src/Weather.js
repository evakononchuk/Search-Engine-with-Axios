import React, { useState } from "react";
import axios from "axios";
//import { Dna } from "react-loader-spinner";

import "./styles.css";

export default function Weather(props) {
  let [city, setCity] = useState("");
  let [message, setMessage] = useState("");
  let [temperature, setTemperature] = useState(null);
  let [description, setDescription] = useState(null);
  let [humidity, setHumidity] = useState(null);
  let [wind, setWind] = useState(null);

  function showWeather(event) {
    event.preventDefault();
    setMessage(
      <div className="App">
        <div className="forecast">
          <div>Temperature: {temperature}°C</div>
          <div>Description: {description}</div>
          <div>Humidity: {humidity}%</div>
          <div>Wind: {wind} km/h</div>
        </div>
      </div>
    );
  }

  function getCity(event) {
    setCity(event.target.value);
  }

  function showForecast(response) {
    setTemperature(Math.round(response.data.main.temp));
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
  }

  let apiKey = "96771e971243152d6b8948878c26adde";
  let unit = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(url).then(showForecast);

  return (
    <div className="App">
      <form onSubmit={showWeather}>
        <input type="search" onChange={getCity}></input>
        <input type="submit" value="Search"></input>
      </form>
      <h2>{message}</h2>
    </div>
  );
}
