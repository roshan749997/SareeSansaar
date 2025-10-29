import { configDotenv } from 'dotenv';
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import connectDB from './config/DataBaseConnection.js';

configDotenv();

const server = express();

const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5174',
  'http://localhost:5173' // Add support for port 5173
];

server.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
server.use(express.json());
server.use(cookieParser());

server.get('/api/health', (req, res) => res.json({ ok: true }));
server.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

await connectDB(process.env.MONGODB_URI || '');

server.listen(PORT, () => {
  console.log('Server is running at', PORT);
});