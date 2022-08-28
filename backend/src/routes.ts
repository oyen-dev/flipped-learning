import { Request, Response, Router } from "express";
import { Db } from "mongodb";
import { getAuth1Routes } from "./auth/auth.routes";
import { AppLogger } from "./utils/logger";
import { serve, setup } from "swagger-ui-express";
import swaggerDoc from "./openapi.json";

export const getRoutes = (db: Db, logger: AppLogger): Router => {
    const router = Router();

    // Load auth v1 routes
    router.use('/v1/auth', getAuth1Routes(db, logger));

    // Load root handlers
    router.use('/', serve, setup(swaggerDoc));

    return router;
}