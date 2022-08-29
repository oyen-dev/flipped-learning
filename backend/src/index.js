const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const { isDev, isProd, isTest } = require('./utils/environment');
const { LOG_ENTITY_SERVER } = require('./utils/consts');
const { AppLogger } = require('./utils/logger');
const { connectToDatabase } = require('./utils/database');
const { routes } = require('./routes');

// Load .env file configuration
dotenv.config({
    path: isProd ?
        path.resolve(__dirname, '.env') :
        isTest ?
            '.env.testing' :
            '.env'
});

// Create express instance
const app = express();

// Configure listening parameters
const host = process.env.HOST || (isDev ? 'localhost' : '::');
const port = parseInt(process.env.PORT || '3000');

// Start the application
async function main() {
    // Init application logger
    await AppLogger.init();

    // Init database connection
    await connectToDatabase();

    // Init routes
    app.use('/api', routes);

    // Start listening requests
    app.listen(port, host, () => {
        AppLogger.writeLog(LOG_ENTITY_SERVER, `Server is running at http://${host}:${port}`);
    });
}
main();