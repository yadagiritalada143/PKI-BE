import Joi from 'joi';
const generateKeysRequestSchema = Joi.object({
    userId: Joi.number().required(),
    secret: Joi.string().required()
});

const saveKeysRequestSchema = Joi.object({
    userId: Joi.number().required(),
    publicKey: Joi.string().required(),
    privateKey: Joi.string().required()
});

const getKeysRequestSchema = Joi.object({
    userId: Joi.number().required()
});

export { generateKeysRequestSchema, saveKeysRequestSchema, getKeysRequestSchema };