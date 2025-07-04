import express from 'express';
import { getWeather, getWeatherAll } from '../controllers/weatherController.js';

const router = express.Router();

router.post('/get-weather', getWeather);
router.post('/get-weather-all', getWeatherAll);

router.post('/test-body', (req, res) => {
  console.log('Request body:', req.body);
  res.json({ received: req.body });
});

export default router;
