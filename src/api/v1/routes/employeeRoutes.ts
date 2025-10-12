import express, { Router } from "express";
import * as employeeController from "../Controllers/employeeController";
import { getEmployeesByBranch, getEmployeesByDepartment } from "../Services/employeeService";

const router: Router = express.Router();

router.get("/", employeeController.getAllEmployees);
router.post("/", employeeController.createEmployee);
router.put("/:id", employeeController.updateEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.get("/branch/:branchId", getEmployeesByBranch);
router.get("/department/:department", getEmployeesByDepartment);

export default router;
