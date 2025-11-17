// src/api/v1/validators/branchValidator.ts
import Joi from "joi";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
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
 *           description: Name of the branch
 *           example: "Downtown Branch"
 *         address:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *           description: Full address of the branch
 *           example: "123 Main Street, Winnipeg, MB"
 *         phone:
 *           type: integer
 *           description: Branch contact phone number
 *           example: 2045551234
 */

export const branchSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  address: Joi.string().min(5).max(100).required(),
  phone: Joi.number().integer().required() 
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
 *           description: User-friendly error message
 *           example: "The phone field is required"
 *         details:
 *           type: array
 *           description: Optional list of detailed validation issues
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "phone"
 *               issue:
 *                 type: string
 *               example: "must be a valid integer"
 */
