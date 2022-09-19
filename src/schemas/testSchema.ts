import Joi from 'joi';

export const newTest = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.string().required(),
    teacherId: Joi.number().required(),
    disciplineId: Joi.number().required()
});
