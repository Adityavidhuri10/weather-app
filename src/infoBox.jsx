import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import './infoBox.css';

export default function InfoBox({ info }) {
  const INIT_URL =
    'https://images.unsplash.com/photo-1664778461586-7a336e264d87?q=80&w=1030&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  // Simple image set like in the video
  const COLD_URL =
    "https://plus.unsplash.com/premium_photo-1672191496375-9659b519bef2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const HOT_URL =
    "https://plus.unsplash.com/premium_photo-1661962369601-37be76489d4e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const RAIN_URL =
    "https://images.unsplash.com/photo-1656703324138-b804553fe8a8?q=80&w=685&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const imageURL =
    info?.humidity > 80 ? RAIN_URL : info?.temp > 15 ? HOT_URL : COLD_URL;

  const WeatherIcon =
    info?.humidity > 80 ? ThunderstormIcon : info?.temp > 15 ? WbSunnyIcon : AcUnitIcon;

  return (
    <div className="InfoBox">
      <h1>Weather Information - {info.weather}</h1>

      <div className="cardContainer">
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia sx={{ height: 140 }} image={imageURL || INIT_URL} title="weather" />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <WeatherIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
              {info.city}
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Temperature: {info.temp}°C (Min: {info.temp_min}°C, Max: {info.temp_max}°C)
              <br />
              Humidity: {info.humidity}%
              <br />
              Feels Like: {info.feelsLike}°C
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
