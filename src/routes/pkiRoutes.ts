import express, { Router } from 'express';
import pkiController from '../controllers/pkiController';
import { generateKeysRequestSchema, saveKeysRequestSchema, getKeysRequestSchema } from '../middlewares/schemas/pkiSchema';
import validatePkiRequest from '../middlewares/validateGenerateKeys';

const pkiRouter: Router = express.Router();

pkiRouter.post('/generateKeys', validatePkiRequest(generateKeysRequestSchema), pkiController.generateKeys);
pkiRouter.post('/saveKeys', validatePkiRequest(saveKeysRequestSchema), pkiController.saveKeys);
pkiRouter.get('/getKeysByUser/:userId', pkiController.getKeysByUser);
pkiRouter.delete('/deleteKeysByKeyId/:keyId', pkiController.deleteKeysById);

export default pkiRouter;