import { Request, Response } from "express";
import * as employeeService from "../Services/employeeService";
import { employees } from "../../../data/employees";

// For Get all method
export const getAllEmployees = (req: Request, res: Response): void => {
  const employees = employeeService.getAllEmployees();
  res.status(200).json({ message: "All employees retrieved", data: employees });
};

// For Create method 
export const createEmployee = (req: Request, res: Response): void => {
  const newEmployee = req.body;
  if (!newEmployee.name || !newEmployee.position || !newEmployee.department) {
    res.status(400).send("Missing required fields");
    return;
  };

  const createdEmployee = employeeService.createEmployee(newEmployee);
  res.status(201).json({ message: "Employee created", data: createdEmployee });
};

// For update method
export const updateEmployee = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const updatedData = req.body;
  const updatedEmployee = employeeService.updateEmployee(id, updatedData);

  if (updatedEmployee) {
    res.status(200).json({ message: "Employee updated", data: updatedEmployee });
  } else {
    res.status(404).send("Employee not found");
  }
};

// For deleteion method
export const deleteEmployee = (req: Request, res: Response): void => {
  const id: number = Number(req.params.id);
  const deleted = employeeService.deleteEmployee(id);

  if (deleted) {
    res.status(200).send("Employee deleted successfully");
  } else {
    res.status(404).send("Employee not found");
  }
};

// for get EmploueeByID method
export const getEmployeeByID = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const employee = employees.find(emp => emp.id === id);

  if (!employee)  return res.status(404).json({ message: "Employee not found"});
    res.status(200).json({data:employee});
};

// For additional logical operators

// Get employees by BranchId
export const getEmployeesByBranch = (req: Request, res: Response) => {
  const branchIdString = req.params.branchId
  const branchId = parseInt(branchIdString, 10);

  if (!branchId || branchId <= 0) {
    return res.status(400).json({ message: "Invalid branchId" });

  }

  const result = employeeService.getEmployeesByBranch(branchId);
  return res.status(200).json(result);
};

// Get employees by department
export const getEmployeesByDepartment = (req: Request, res: Response) => {
  const department = req.params.department;

  if (!department) {
    return res.status(400).json({ message: "Department is required" });
  }

  const result = employees.filter(emp => emp.department === department);
  return res.status(200).json(result);
};