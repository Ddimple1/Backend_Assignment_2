import express, { Router } from "express";
import * as employeeController from "../Controllers/employeeController";
import { getEmployeesByBranch, getEmployeesByDepartment } from "../Services/employeeService";
import { validateEmployee } from "../middleware/logRequest";

const router: Router = express.Router();

/**
 * @openapi
 * /api/employee:
 *   get:
 *     summary: Retrieve a list of all employees
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Maximum number of employees to return
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 20
 *       - name: department
 *         in: query
 *         required: false
 *         description: Filter employees by department id
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - name: sort
 *         in: query
 *         required: false
 *         description: Sort employees by ID in ascending or descending order
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *     responses:
 *       '200':
 *         description: Successfully retrieved employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 employees:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/employeeValidation'
 *                 total:
 *                   type: integer
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/employeeValidation'
 *     responses:
 *       '201':
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/employeeValidation'
 *       '400':
 *         description: Bad request - validation failed
 *       '500':
 *         description: Server error
 *   put:
 *     summary: Update an existing employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the employee to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/employeeValidation'
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/employeeValidation'
 *       '400':
 *         description: Bad request - validation failed
 *       '500':
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete an employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the employee to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Employee deleted successfully
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Server error
 * 
 * /api/employees/branch/{branchId}:
 *   get:
 *     summary: Get employees by branch ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         description: Branch ID to filter employees
 *         schema:
 *           type: integer
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
 *                     $ref: '#/components/schemas/employeeValidation'
 *                 total:
 *                   type: integer
 *       '404':
 *         description: No employees found for specified branch
 *       '500':
 *         description: Server error
 * 
 * /api/employees/department/{department}:
 *   get:
 *     summary: Get employees by department name
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         description: Department name to filter employees
 *         schema:
 *           type: string
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
 *                     $ref: '#/components/schemas/employeeValidation'
 *                 total:
 *                   type: integer
 *       '404':
 *         description: No employees found for the given department
 *       '500':
 *         description: Server error
 * 
  * /api/employees/{id}:
 *   get:
 *     summary: Get an employee by ID
 *     tags:
 *       - Employees
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the employee to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Employee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/employeeValidation'
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Server error
 */
router.get("/", employeeController.getAllEmployees);
router.put("/:id", validateEmployee, employeeController.updateEmployee);
router.delete("/:id", validateEmployee, employeeController.deleteEmployee);
router.get("/branch/:branchId", getEmployeesByBranch);
router.get("/department/:department", getEmployeesByDepartment);
router.get("/:id", employeeController.getEmployeeByID);

export default router;
