import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import config from './config';
import MutantController from './controllers/MutantController';
import StatsController from './controllers/StatsController';
import HealthController from './controllers/HealthController';
const actuator = require('express-actuator');
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../static')));
// Configurar cabeceras y cors
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(actuator({
    basePath: '/mutant'
}));
app.use('', MutantController);
app.use('', HealthController);
app.use('', StatsController);

export default app;
