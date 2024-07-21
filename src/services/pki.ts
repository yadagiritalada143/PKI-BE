import crypto from 'crypto';
import { generateKeysResponse, getKeysResponse } from '../intefaces/pkiInterface';
import keysModel from '../model/keysModel';

const generateKeys = (userId: number, secret: string): Promise<generateKeysResponse> => {
    return new Promise((resolve, reject) => {
        const customSecret = secret + userId;
        crypto.generateKeyPair('rsa', {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',      // Encrypt private key using AES-256-CBC
                passphrase: customSecret
            }
        }, (error, publicKey, privateKey) => {
            if (error) {
                reject({ success: false, message: `Error generating RSA key pair: ${error}` });
            } else {
                resolve({ success: true, publicKey: publicKey, privateKey: privateKey });
            }
        });
    });
}

const saveKeys = (keysData: any) => {
    return keysModel.create(keysData);
}

const getKeysByUser = async (userId: number): Promise<getKeysResponse[]> => {
    return await keysModel.findAll({ where: { userId: userId } })
        .then(keysResponse => keysResponse);
}

const deleteKeysById = async (keyId: number) => {
    return await keysModel.destroy({ where: { id: keyId } })
        .then(deleteKeysResponse => deleteKeysResponse);
}

export default { generateKeys, saveKeys, getKeysByUser, deleteKeysById };