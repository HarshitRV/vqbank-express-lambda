import express, { Express, Request, Response, NextFunction } from 'express';
import { ERROR_TYPES } from '../global-types';
import { APP_ROUTES } from './types';
import paperRouter from '../routers/paper';
import MongoDatabase from '../db/MongoDatabase';

const app: Express = express();

app.use(APP_ROUTES.V1, paperRouter)

app.route('/').get(async (_req, res) => {
    try {
        res.status(200).json({
            message: 'vq bank is up and running'
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: 'Something broke!',
        })
    }
});

app.all('*', (_req, _res, next) => {
    next(new Error(ERROR_TYPES[404]));
});

app.use(async (err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.log(err);

    /** If the database connection has been established then close it */
    if (req['db']) {
        const db: MongoDatabase = req['db'];
        await db.disconnect();
    }

    if (err.message === ERROR_TYPES[404]) {
        res.status(404).json({
            message: ERROR_TYPES[404],
        })

        return;
    }

    res.status(500).json({
        message: "Oops! Something went wrong!",
    })
});

export default app;