import express, { Express, Request, Response, NextFunction } from 'express';
import { ERROR_TYPES } from './global-types';

const app: Express = express();

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

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.log(err);

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