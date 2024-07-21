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

export default { generateKeys }