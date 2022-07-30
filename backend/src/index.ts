import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file configuration
dotenv.config({
    path: path.resolve(__dirname, '.env'),
});

// Initialize express instance
const app: Express = express();

// Start listening requests
const host = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT || '3000');

// Endpoints routing
app.all('/', (_: Request, res: Response) => {
    res.send('Welcome. Flipped Learning API is working.')
});

app.listen(port, host, () => {
    console.log(`[server]: Server is running at http://${host}:${port}`)
});