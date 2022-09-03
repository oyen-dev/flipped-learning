const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const { isDev, isProd, isTest } = require('./utils/environment')
const { LOG_ENTITY_SERVER } = require('./utils/consts')
const { AppLogger } = require('./utils/logger')
const { connectToDatabase } = require('./utils/database')
// const { routes } = require('./routes')
const { auth1Routes } = require('./auth/auth.routes')

// Load .env file configuration
dotenv.config({
  path: isProd
    ? path.resolve(__dirname, '.env')
    : isTest
      ? '.env.testing'
      : '.env'
})

// Create express instance
const app = express()

// parse application/json
app.use(express.json())

// Configure listening parameters
const host = process.env.HOST || (isDev ? 'localhost' : '::')
const port = parseInt(process.env.PORT || '3000')

// Start the application
async function main () {
  // Init application logger
  await AppLogger.init()

  // Init database connection
  await connectToDatabase()

  // Init routes
  // app.use('/api', routes)
  app.use('/api/v1/auth', auth1Routes)

  // Start listening requests
  app.listen(port, host, () => {
    AppLogger.writeLog(LOG_ENTITY_SERVER, `Server is running at http://${host}:${port}`)
  })
}
main()
