import { Db, MongoClient, MongoServerError } from "mongodb"
import { LOG_ENTITY_DATABASE } from "./consts";
import { AppLogger } from "./logger";

export const connectToDatabase = async (logger: AppLogger): Promise<Db> => {
    const client: MongoClient = new MongoClient(
        process.env.DB_CONN_STRING!!
    );

    try {
        await client.connect();
        logger.writeLog(LOG_ENTITY_DATABASE, 'Database connection is established successfully')
    } catch(e) {
        if(e instanceof MongoServerError) {
            logger.writeLog(LOG_ENTITY_DATABASE, e.errmsg);
        } else {
            logger.writeLog(LOG_ENTITY_DATABASE, `${e}`);
        }
        process.exit(1);
    }

    return client.db(process.env.DB_NAME!!)
}