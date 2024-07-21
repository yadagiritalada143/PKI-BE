import Joi from 'joi';
const generateKeysRequestSchema = Joi.object({
    userId: Joi.number().required(),
    secret: Joi.string().required()
});

export default generateKeysRequestSchema;