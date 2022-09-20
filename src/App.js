import React, { useState } from "react";
import axios from "axios";
import { UilTemperature, UilTear, UilWind } from "@iconscout/react-unicons";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=79b888d2b147d0f96b2ca714cad2d847&units=metric`;

  const iconUrlFromCodel = (code) =>
    `http://openweathermap.org/img/wn/10d@2x.png`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            <img src={iconUrlFromCodel()} alt="" />
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              <UilTemperature
                size={25}
                className="text-white cursor-pointer transition ease-out hover:scale-125"
              />
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              <UilTear
                size={25}
                className="text-white cursor-pointer transition ease-out hover:scale-125"
              />
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              <UilWind
                size={25}
                className="text-white cursor-pointer transition ease-out hover:scale-125"
              />
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
