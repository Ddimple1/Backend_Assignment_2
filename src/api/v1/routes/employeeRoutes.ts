import express, { Router } from "express";
import * as employeeController from "../Controllers/employeeController";
import { getEmployeesByBranch, getEmployeesByDepartment } from "../Services/employeeService";
import { validateEmployee } from "../middleware/logRequest";

const router: Router = express.Router();

router.get("/", employeeController.getAllEmployees);
router.post("/", validateEmployee, employeeController.createEmployee);
router.put("/:id", validateEmployee, employeeController.updateEmployee);
router.delete("/:id", validateEmployee, employeeController.deleteEmployee);
router.get("/branch/:branchId", getEmployeesByBranch);
router.get("/department/:department", getEmployeesByDepartment);
router.get("/:id", employeeController.getEmployeeByID);

export default router;
