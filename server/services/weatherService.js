import fetch from 'node-fetch';
import 'dotenv/config';

const API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getWeatherData(city) {
  if (!API_KEY) throw new Error('API key is missing in .env!');

  // Get current weather
  const currentURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
  const currentRes = await fetch(currentURL);
  if (!currentRes.ok) {
    const text = await currentRes.text();
    console.error('[Service] Current fetch failed:', text);
    throw new Error('Invalid city or API key');
  }
  const current = await currentRes.json();

  // Get forecast (5 day / 3 hour)
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${current.coord.lat}&lon=${current.coord.lon}&units=metric&appid=${API_KEY}`;
  const forecastRes = await fetch(forecastURL);
  if (!forecastRes.ok) {
    const text = await forecastRes.text();
    console.error('[Service] Forecast fetch failed:', text);
    throw new Error('Forecast data error');
  }
  const forecast = await forecastRes.json();

  // Process hourly (next 8 intervals)
  const hourly = forecast.list.slice(0, 8).map(item => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temperature: item.main.temp,
    wind: item.wind.speed,
    precipitation: item.rain?.['3h'] || 0,
  }));

  // Approximate daily
  const dailyMap = new Map();
  for (const item of forecast.list) {
    const day = new Date(item.dt * 1000).toLocaleDateString([], { weekday: 'short' });
    if (!dailyMap.has(day)) {
      dailyMap.set(day, {
        day,
        high: item.main.temp,
        low: item.main.temp,
        icon: item.weather[0].icon,
      });
    } else {
      const entry = dailyMap.get(day);
      entry.high = Math.max(entry.high, item.main.temp);
      entry.low = Math.min(entry.low, item.main.temp);
    }
  }
  const daily = Array.from(dailyMap.values()).slice(0, 5);

  return {
    city: current.name,
    temperature: current.main.temp,
    feelsLike: current.main.feels_like,
    minTemp: current.main.temp_min,
    maxTemp: current.main.temp_max,
    humidity: current.main.humidity,
    windSpeed: current.wind.speed,
    pressure: current.main.pressure,
    condition: current.weather[0].description,
    icon: current.weather[0].icon,
    hourly,
    daily,
  };
}
