// src/api/v1/validators/employeeValidator.ts
import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
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
 *           description: Full name of the employee
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee's email address
 *           example: "john.doe@pixell-river.com"
 *         position:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Job position or title
 *           example: "IT Manager"
 *         department:
 *           type: string
 *           minLength: 2
 *           maxLength: 50
 *           description: Department the employee belongs to
 *           example: "IT"
 *         branchId:
 *           type: integer
 *           minimum: 1
 *           description: ID of the branch the employee belongs to
 *           example: 3
 */

export const employeeSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  position: Joi.string().min(2).max(50).required(),
  department: Joi.string().min(2).max(50).required(),
  branchId: Joi.number().integer().positive().required() // must be a positive integer
});

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "The email field is required"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "email"
 *               issue:
 *                 type: string
 *                 example: "must be a valid email address"
 *           description: Detailed validation errors (optional)
 */
