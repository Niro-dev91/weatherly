import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather.js';
import chatRoutes from './routes/chat.js';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log('REQUEST:', req.method, req.url);
  next();
});

// Register routes
app.use('/api', weatherRoutes);
app.use('/api', chatRoutes);


// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});