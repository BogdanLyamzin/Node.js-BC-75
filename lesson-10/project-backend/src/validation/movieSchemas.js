import Joi from "joi";

import { typeList, minReleaseYear } from "../constants/movie-constants.js";

export const movieAddSchema = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "title must be exist",
        "string.base": "title must be string"
    }),
    director: Joi.string().required(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typeList),
    releaseYear: Joi.number().min(minReleaseYear).required()
});

export const movieUpdateSchema = Joi.object({
    title: Joi.string(),
    director: Joi.string(),
    favorite: Joi.boolean(),
    type: Joi.string().valid(...typeList),
    releaseYear: Joi.number().min(minReleaseYear)
});