import fetch from 'node-fetch';
import 'dotenv/config';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

function getWeatherEmoji(main) {
  switch (main.toLowerCase()) {
    case 'clear': return '☀️';
    case 'clouds': return '☁️';
    case 'rain': return '🌧️';
    case 'thunderstorm': return '⛈️';
    case 'snow': return '❄️';
    default: return '🌤️';
  }
}

export async function fetchFullWeatherByCity(city) {
  console.log('[Service] Fetching weather for:', city);

  // 1. Get current weather
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  const currentRes = await fetch(currentURL);
  if (!currentRes.ok) {
    console.error('[Service] Current fetch failed:', currentRes.status);
    return null;
  }
  const current = await currentRes.json();

  const { lat, lon } = current.coord;

  // 2. Get 5-day/3-hour forecast
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`;
  const forecastRes = await fetch(forecastURL);
  if (!forecastRes.ok) {
    console.error('[Service] Forecast fetch failed:', forecastRes.status);
    return null;
  }
  const forecast = await forecastRes.json();


  const hourly = forecast.list.slice(0, 8).map(h => ({
    time: new Date(h.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: h.main.temp,
    wind: h.wind.speed,
    precipitation: h.rain ? h.rain['3h'] || 0 : 0,
  }));

  // 4. Build simple daily summary (by grouping per day)
  const dailyMap = new Map();
  for (const entry of forecast.list) {
    const date = new Date(entry.dt * 1000).toLocaleDateString([], { weekday: 'short' });
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        day: date,
        high: entry.main.temp,
        low: entry.main.temp,
        icon: getWeatherEmoji(entry.weather[0].main),
      });
    } else {
      const d = dailyMap.get(date);
      d.high = Math.max(d.high, entry.main.temp);
      d.low = Math.min(d.low, entry.main.temp);
    }
  }

  const daily = Array.from(dailyMap.values()).slice(0, 7);

  return {
    city: current.name,
    temperature: current.main.temp,
    condition: current.weather[0].description,
    humidity: current.main.humidity,
    wind: current.wind.speed,
    precipitation: current.rain ? current.rain['1h'] || 0 : 0,
    hourly,
    daily,
  };
}
