import fetch from 'node-fetch';
import 'dotenv/config';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
console.log('API key:', OPENWEATHER_API_KEY);

async function test() {
  const city = 'New York';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
  const res = await fetch(url);
  const data = await res.text();
  console.log('Response:', res.status, data);
}

test();
