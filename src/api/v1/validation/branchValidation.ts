import Joi from "joi";

/**
 * @openapi
 * components:
 *    schemas:
 *     branchValidation:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "Downtown Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *           example: "123 Main Street, Winnipeg, MB"
 *         phone:
 *           type: integer
 */

export const branchSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(5).max(100).required(),
  phone: Joi.number().integer().required(),
});