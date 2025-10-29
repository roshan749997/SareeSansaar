import { configDotenv } from 'dotenv';
import express from 'express'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import connectDB from './config/DataBaseConnection.js';

configDotenv();

const server = express();

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5174';
server.use(cors({ origin: FRONTEND_URL, credentials: true }));
server.use(express.json());
server.use(cookieParser());

server.get('/api/health', (req, res) => res.json({ ok: true }));
server.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

await connectDB(process.env.MONGODB_URI || '');

server.listen(PORT, () => {
  console.log('Server is running at', PORT);
});