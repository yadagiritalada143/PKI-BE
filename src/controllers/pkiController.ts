import { Request, Response } from 'express';
import pkiService from '../services/pki';
import { COMMON_ERRORS } from '../constants/commonErrorMessages';

const generateKeys = (req: Request, res: Response) => {
    const { userId, secret } = req.body;
    pkiService.generateKeys(userId, secret)
        .then((responseAfterKeysGeneration: any) => {
            res.status(200).json({ success: true, publicKey: responseAfterKeysGeneration.publicKey, privateKey: responseAfterKeysGeneration.privateKey });
        })
        .catch((error: any) => {
            console.error(`Error in generating keys: ${error}`);
            return res.status(500).json({ message: COMMON_ERRORS.GENERATE_KEYS_ERROR });
        });
}

const saveKeys = (req: Request, res: Response) => {
    const { userId, publicKey, privateKey } = req.body;
    pkiService.saveKeys({ userId, publicKey, privateKey })
        .then((responseAfterKeysSaved: any) => {
            pkiService.getKeysByUser(userId)
                .then((getAllKeysByUserResponse) => {
                    res.status(200).json({ success: true, keys: getAllKeysByUserResponse });
                })
                .catch((error: any) => {
                    console.error(`Error in fetching after saved keys: ${error}`);
                    return res.status(500).json({ message: COMMON_ERRORS.FETCH_KEYS_ERROR });
                });
        })
        .catch((error: any) => {
            console.error(`Error in saving keys: ${error}`);
            return res.status(500).json({ message: COMMON_ERRORS.SAVE_KEYS_ERROR });
        });
}

const getKeysByUser = (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
    pkiService.getKeysByUser(userId)
        .then((getAllKeysByUserResponse) => {
            res.status(200).json({ success: true, keys: getAllKeysByUserResponse });
        })
        .catch((error: any) => {
            console.error(`Error in fetching keys: ${error}`);
            return res.status(500).json({ message: COMMON_ERRORS.FETCH_KEYS_ERROR });
        });
}

const deleteKeysById = (req: Request, res: Response) => {
    const keyId = Number(req.params.keyId);
    pkiService.deleteKeysById(keyId)
        .then((deleteKeysByIdResponse) => {
            res.status(200).json({ success: true });
        })
        .catch((error: any) => {
            console.error(`Error in deleting keys: ${error}`);
            return res.status(500).json({ message: COMMON_ERRORS.DELETE_KEYS_ERROR });
        });
}

export default { generateKeys, saveKeys, getKeysByUser, deleteKeysById }