import debugLib from 'debug';
import { Request, Response, Router } from 'express';

import MutantService from '../services/mutant/MutantService';
import OpenApiValidatorProvider from '../utilities/OpenApiValidatorProvider';

const debug     = debugLib('api:MutantController');
const MutantController    = Router();
const validator = OpenApiValidatorProvider.getValidator();

MutantController.post('/mutant',
    validator.validate('post', '/mutant'),
    async (req: Request, res: Response) => {
    MutantService.isMutant(req.body.dna).then((mutant) => {
        if (mutant === true) {
            res.status(200).send();
        } else {
            res.status(403).send();
        }
    }).catch((err) => {
        res.status(500).send(err);
    });
});

export default MutantController;
