import express, { Router } from 'express';
import pkiController from '../controllers/pkiController';
import generateKeysRequestSchema from '../middlewares/schemas/pkiSchema';
import validateGenerateKeysRequest from '../middlewares/validateGenerateKeys';

const pkiRouter: Router = express.Router();

pkiRouter.post('/generateKeys', validateGenerateKeysRequest(generateKeysRequestSchema), pkiController.generateKeys);

export default pkiRouter;