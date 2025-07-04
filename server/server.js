import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather.js';
import 'dotenv/config';

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use('/api', weatherRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
