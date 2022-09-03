const { access, appendFile, writeFile } = require('fs/promises')
const fs = require('fs')
const { LOG_ENTITY_LOGGER } = require('./consts')

class AppLogger {
  static fileLogPath = process.env.LOG_PATH || ''
  static fileLogEnabled = false

  static async init () {
    if (this.fileLogPath === '') {
      this.fileLogEnabled = false
    } else {
      try {
        if (!fs.existsSync(this.fileLogPath)) {
          writeFile(this.fileLogPath, '')
        }
        await access(this.fileLogPath, fs.constants.W_OK)
        this.fileLogEnabled = true
        await this.writeLog('', '\n', false)
        await this.writeLog(LOG_ENTITY_LOGGER, '==========================================================', false)
        this.writeLog(LOG_ENTITY_LOGGER, 'Logging started at ' + new Date() + '\n', false)
      } catch (e) {
        this.writeLog(LOG_ENTITY_LOGGER, 'File log path access is denied. File log will be disabled.')
      }
    }
  }

  static async writeLog (entity, message, isConsoleLog = true) {
    const logMessage = `${entity}: ${message}`
    if (isConsoleLog) {
      console.log(logMessage)
    }
    if (this.fileLogEnabled) {
      await appendFile(this.fileLogPath, logMessage + '\n')
    }
  }
}

module.exports = {
  AppLogger
}
