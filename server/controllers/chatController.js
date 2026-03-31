import { getWeatherData } from '../services/weatherService.js';
import { askWeatherAssistant } from '../services/aiChatService.js';

export async function chatWithWeatherBot(req, res) {
  try {
    const { message, city } = req.body;

    if (!message || !city) {
      return res.status(400).json({ message: 'message and city are required' });
    }

    const weatherData = await getWeatherData(city);

    if (!weatherData) {
      return res.status(404).json({ message: 'Weather not found' });
    }

    const reply = await askWeatherAssistant(message, weatherData);

    res.json({
      city,
      weather: weatherData,
      reply,
    });
  } catch (error) {
    console.error('chatWithWeatherBot error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
}