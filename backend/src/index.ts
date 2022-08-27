import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

// Load .env file configuration
dotenv.config({
    path: path.resolve(__dirname, '.env'),
});
const { NODE_ENV = 'development' } = process.env

// Initialize express instance
const app: Express = express();

// Start listening requests
const host = process.env.HOST || (NODE_ENV === 'development' ? 'localhost' : '::');
const port = parseInt(process.env.PORT || '3000');

// Endpoints routing
app.all('/api', (_: Request, res: Response) => {
    res.json({
        message: 'Welcome. Flipped Learning API is working.'
    })
});

app.listen(port, host, () => {
    console.log(`[server]: Server is running at http://${host}:${port}`)
});