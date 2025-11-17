// src/api/v1/validators/branchValidator.ts
import Joi from "joi";

export const branchSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(5).max(100).required(),
  phone: Joi.number().integer().required() 
});
