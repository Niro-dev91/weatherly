import express from 'express';
import { chatWithWeatherBot } from '../controllers/chatController.js';

const router = express.Router();

router.post('/chat', chatWithWeatherBot);

export default router;