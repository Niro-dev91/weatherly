import { fetchFullWeatherByCity } from '../services/openWeatherService.js';
import { getWeatherData } from '../services/weatherService.js';

export async function getWeather(req, res) {
  const { userInput } = req.body;

  if (!userInput || !userInput.trim()) {
    console.error('[Controller] Empty user input');
    return res.status(400).json({ error: 'City is required' });
  }

  try {
    const data = await fetchFullWeatherByCity(userInput.trim());

    if (!data) {
      return res.status(404).json({ error: 'City not found' });
    }

    return res.json(data);

  } catch (err) {
    console.error('[Controller] Unexpected error in getWeather:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
export async function getWeatherAll(req, res) {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City is required in request body.' });
    }

    const data = await getWeatherData(city);
    res.json(data);
  } catch (error) {
    console.error('[Controller] Error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
