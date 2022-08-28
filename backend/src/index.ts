import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { isDev, isProd, isTest } from './utils/environment';
import { LOG_ENTITY_SERVER } from './utils/consts';
import { AppLogger } from './utils/logger';
import { connectToDatabase } from './utils/database';

// Load .env file configuration
dotenv.config({
    path: isProd ?
        path.resolve(__dirname, '.env') :
        isTest ?
            '.env.testing' :
            '.env'
});

// Create express instance
const app: Express = express();

// Create application logger instance
const logger = new AppLogger();

// Configure listening parameters
const host = process.env.HOST || (isDev ? 'localhost' : '::');
const port = parseInt(process.env.PORT || '3000');

// Start the application
async function main() {
    // Init application logger
    await logger.init();

    // Init database connection
    const db = await connectToDatabase(logger);

    // Init routes
    app.all('/api', (_: Request, res: Response) => {
        res.json({
            message: 'Welcome. Flipped Learning API is working.'
        });
    });

    // Start listening requests
    app.listen(port, host, () => {
        logger.writeLog(LOG_ENTITY_SERVER, `Server is running at http://${host}:${port}`);
    });
}
main();