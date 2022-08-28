import { Router } from "express";
import { Db } from "mongodb";
import { AppLogger } from "../utils/logger";
import { getLoginHandler } from "./auth.handlers";

export const getAuth1Routes = (db: Db, logger: AppLogger): Router => {
    const router = Router();

    router.post('/login', getLoginHandler(db, logger))

    return router;
}