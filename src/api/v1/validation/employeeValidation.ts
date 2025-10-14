// src/api/v1/validators/employeeValidator.ts
import Joi from "joi";

export const employeeSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  position: Joi.string().min(2).max(50).required(),
  department: Joi.string().min(2).max(50).required(),
  branchId: Joi.number().integer().positive().required() // must be a positive integer
});
