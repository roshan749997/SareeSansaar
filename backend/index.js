import { configDotenv } from 'dotenv';
import express from 'express'
const dotenv = configDotenv();
const server = express();
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log("Server is running at", PORT);
});