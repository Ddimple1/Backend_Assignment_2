import express, { Router } from "express";
import * as employeeController from "../Controllers/employeeController";
import { getEmployeesByBranch, getEmployeesByDepartment } from "../Services/employeeService";
import { validateEmployee } from "../middleware/logRequest";

const router: Router = express.Router();
/**
 * @openapi
 * /api/employees:
 *   get:
 *     summary: Retrieve a list of all employees
 *     tags: [Employees]
 *     parameters: 
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximim: 100
 *           default: 20
 *         description: Maximum number of employees to return
 *        - name: department
 *          in: query
 *          required: false
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Filter emplolyees by department name
 *         - name: sort
 *           in: query
 *           required: false
 *           schema:
 *             type: string
 *             enum: [asc, desc]
 *           description: Sort employees by ID in ascending or descending order
 *       responses:
 *         '200':
 *           description: successfully retrieved employees
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   employees:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/validations/Employee'
 *                   total:
 *                     type: integer
 */
router.get("/", employeeController.getAllEmployees);
/**
 * @openapi
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/Employee'
 *     responses:
 *       '201':
 *         description: Employee Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/employeeValidation'
 *       '400':
 *         description: Bad request - validation failed
 *       '500':
 *         description: Server Error
 */
router.post("/", validateEmployee, employeeController.createEmployee);
/**
 * @openapi
 * /api/employees/{id}:
 *   put:
 *     summary: Update an existing employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the employee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/validations/Employee'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/employeeValidation'
 *       '400':
 *         description: Bad request - validation failed
 *       '500':
 *         description: Server Error
 */
router.put("/:id", validateEmployee, employeeController.updateEmployee);
/**
 * @openapi
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the employee to delete
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Server Error
 */
router.delete("/:id", validateEmployee, employeeController.deleteEmployee);
/**
 * @openapi
 * /api/employees/branch/{branchId}:
 *   get:
 *     summary: Get employees by branch ID
 *     tags: [Employees]
 *     parameters:
 *       - name: branchid
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID to filter employees
 *     responses:
 *       '200':
 *         description: Employees belonging to the specified branch
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/validations/employeeValidation'
 *                 total:
 *                   type: integer
 *       '404':
 *         description: No employees found for specified branch
 *       '500':
 *         description: Server Error
 */
router.get("/branch/:branchId", getEmployeesByBranch);
/**
 * @openapi
 * /api/employees/department/{department}:
 *   get:
 *     summary: Get employees by department name
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: department name to filter employees
 *     responses:
 *       '200':
 *         description: Employees belonging to the specified department
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/validations/employeeValidation'
 *                 total:
 *                   type: integer
 *       '404':
 *         description: No employees found for the given deprtment
 *       '500':
 *         description: Server Error
 */
router.get("/department/:department", getEmployeesByDepartment);
/**
 * @openapi
 * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the employee to retrieve
 *     responses:
 *       '200':
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/validations/employeeValidation'
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Server error
 */
router.get("/:id", employeeController.getEmployeeByID);

export default router;
