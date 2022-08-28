import { Request, RequestHandler, Response } from "express";
import { Db } from "mongodb";
import { AppLogger } from "../utils/logger";

export const getLoginHandler = (db: Db, logger: AppLogger) => {
    return (req: Request, res: Response) => {
        res.status(501).json({
            messages: 'TODO implemented'
        })
    }
}