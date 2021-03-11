import debugLib from 'debug';
import { Request, Response, Router } from 'express';

import MutantService from '../services/mutant/MutantService';
import OpenApiValidatorProvider from '../utilities/OpenApiValidatorProvider';
import StatsService from "../services/stats/StatsService";

const debug     = debugLib('api:HealthController');
const HealthController    = Router();
const validator = OpenApiValidatorProvider.getValidator();

HealthController.get('/',
    async (req: Request, res: Response) => {
    res.status(200).send('OK');
});

export default HealthController;
