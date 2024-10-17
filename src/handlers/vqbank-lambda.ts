import app from '../vqbank-express-app/app';
import serverless from 'serverless-http';

exports.handler = serverless(app);