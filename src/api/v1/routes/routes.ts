import express, {Router} from "express";
import * as employeeController from "../Controllers/employeeController";
import * as branchController from "../Controllers/branchController";
import { getEmployeesByBranch, getEmployeesByDepartment } from "../Services/employeeService";

const router: Router = express.Router();

router.get("/api/v1/items", (req, res) => {
    res.send("Get all items");
});

router.post("/api/v1/items", (req, res) => {
    res.send("Create a new item");
});

router.put("/api/v1/items/:id", (req, res) => {
    res.send("Update an item");
});

router.delete("/api/v1/items/:id", (req, res) => {
    res.send("Delete an item");
});


// Routes defined for employees
router.get("/employees", employeeController.getAllEmployees);
router.post("/employees", employeeController.createEmployee);
router.put("/employees/:id", employeeController.updateEmployee);
router.delete("/employees/:id", employeeController.deleteEmployee);


// Routes defined for Branches
router.get("/branches", branchController.getAllBranches);
router.post("/branches", branchController.createBranch);
router.put("/branches/:id", branchController.updateBranch);
router.delete("/branches/:id", branchController.deleteBranch);

// Additional logical operators
router.get("/employees/branch/:branchId", getEmployeesByBranch);
router.get("/employees/department/:department", getEmployeesByDepartment);
    
export default router;