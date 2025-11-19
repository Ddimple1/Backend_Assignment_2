import Joi from "joi";

/**
 * @openapi
 * components:
 *    schemas:
 *     employeeValidation:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - position
 *         - department
 *         - branchId
 *       properties:
 *         name:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@pixell-river.com"
 *         position:
 *           type: string
 *           example: "IT Manager"
 *         department:
 *           type: string
 *           example: "IT"
 *         branchId:
 *           type: integer
 *           example: 3
 */

export const employeeSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  position: Joi.string().min(2).max(50).required(),
  department: Joi.string().min(2).max(50).required(),
  branchId: Joi.number().integer().positive().required(),
});
