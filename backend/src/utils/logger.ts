import { access, appendFile, writeFile } from "fs/promises";
import { constants as fsConstants, existsSync } from "fs";
import { LOG_ENTITY_LOGGER } from "./consts";

export class AppLogger {
    fileLogPath = process.env.LOG_PATH || ""
    fileLogEnabled: boolean = false;

    async init(): Promise<void> {
        if (this.fileLogPath == "") {
            this.fileLogEnabled = false;
        } else {
            try {
                if (!existsSync(this.fileLogPath)) {
                    writeFile(this.fileLogPath, "");
                }
                await access(this.fileLogPath, fsConstants.W_OK);
                this.fileLogEnabled = true;
                await this.writeLog("", "\n", false);
                await this.writeLog(LOG_ENTITY_LOGGER, '==========================================================', false);
                this.writeLog(LOG_ENTITY_LOGGER, 'Logging started at ' + new Date() + "\n", false);
            } catch (e) {
                this.writeLog(LOG_ENTITY_LOGGER, 'File log path access is denied. File log will be disabled.')
            }
        }
    }

    async writeLog(entity: string, message: string, isConsoleLog: boolean = true) {
        const logMessage = `${entity}: ${message}`;
        if (isConsoleLog) {
            console.log(logMessage);
        }
        if (this.fileLogEnabled) {
            await appendFile(this.fileLogPath, logMessage + "\n");
        }
    }
}