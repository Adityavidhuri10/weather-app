import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './SearchBox.css';
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState('');
  let [error, setError] = useState(false);

const GEO_URL = import.meta.env.VITE_GEO_URL;
const WEATHER_URL = import.meta.env.VITE_WEATHER_URL;
const API_KEY = import.meta.env.VITE_API_KEY;


  const getWeatherinfo = async () => {
    try {
      // 1) Geocoding
      const geoRes = await fetch(`${GEO_URL}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`);
      const geoData = await geoRes.json();
      if (!Array.isArray(geoData) || geoData.length === 0) {
        throw new Error('City not found');
      }

      const { lat, lon } = geoData[0];

      // 2) Weather
      const response = await fetch(
        `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const jsonResponse = await response.json();

      return {
        city,
        temp: jsonResponse.main.temp,
        temp_min: jsonResponse.main.temp_min,
        temp_max: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather?.[0]?.main || '—',
      };
    } catch (e) {
      setError(true);
      return null;
    }
  };

  const handleChange = (event) => {
    setCity(event.target.value);
    setError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newInfo = await getWeatherinfo();
    if (newInfo) {
      updateInfo(newInfo);
      setCity('');
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{ color: 'red' }}>No such place exists!</p>}
      </form>
    </div>
  );
}
