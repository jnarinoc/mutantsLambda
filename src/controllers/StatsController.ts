import debugLib from 'debug';
import { Request, Response, Router } from 'express';

import MutantService from '../services/mutant/MutantService';
import OpenApiValidatorProvider from '../utilities/OpenApiValidatorProvider';
import StatsService from "../services/stats/StatsService";

const debug     = debugLib('api:StatsController');
const StatsController    = Router();
const validator = OpenApiValidatorProvider.getValidator();

StatsController.get('/stats',
    validator.validate('get', '/stats'),
    async (req: Request, res: Response) => {
    StatsService.getStats().then((result) => {
        res.status(200).send(result);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

export default StatsController;
