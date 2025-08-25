import { useState } from "react";
import SearchBox from "./SearchBox";
import InfoBox from "./infoBox";

export default function WeatherApp() {
  const [weatherInfo, setWeatherInfo] = useState({
    city: "Sample City",
    temp: 25,
    temp_min: 20,
    temp_max: 30,
    humidity: 60,
    feelsLike: 27,
    weather: "Sunny",
  });

  const updateWeatherInfo = (newInfo) => {
    if (newInfo) setWeatherInfo(newInfo); // guards against null on failed fetch
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Search for the Weather</h2>
      <SearchBox updateInfo={updateWeatherInfo} />
      <InfoBox info={weatherInfo} />
    </div>
  );
}
