import keysCombination from '../types/keys';
interface generateKeysResponse {
    success: boolean;
    publicKey?: string;
    privateKey?: string;
    message?: string;
}

interface getKeysResponse {
    id: number;
    publicKey: string;
    privateKey: string;
    userId?: number;
}

export { generateKeysResponse, getKeysResponse }