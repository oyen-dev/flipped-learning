import { Request, Response, Router } from "express";
import { Db } from "mongodb";
import { getAuth1Routes } from "./auth/auth.routes";
import { AppLogger } from "./utils/logger";

export const getRoutes = (db: Db, logger: AppLogger): Router => {
    const router = Router();

    // Load auth v1 routes
    router.use('/v1/auth', getAuth1Routes(db, logger));

    // Load root handlers
    router.all('/', (_: Request, res: Response) => {
        res.json({
            message: 'Welcome. Flipped Learning API is working.'
        });
    });

    return router;
}