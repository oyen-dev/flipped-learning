const mongoose = require("mongoose");
const { LOG_ENTITY_DATABASE } = require("./consts");
const { AppLogger } = require('../utils/logger')

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            process.env.DB_CONN_STRING
        );
        AppLogger.writeLog(LOG_ENTITY_DATABASE, 'Database connection is established successfully')
    } catch (e) {
        if (e instanceof MongoServerError) {
            AppLogger.writeLog(LOG_ENTITY_DATABASE, e.errmsg);
        } else {
            AppLogger.writeLog(LOG_ENTITY_DATABASE, `${e}`);
        }
        process.exit(1);
    }
}

module.exports = {
    connectToDatabase
}