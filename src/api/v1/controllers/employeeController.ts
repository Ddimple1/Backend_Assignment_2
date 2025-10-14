import { Request, Response } from "express";
import * as employeeService from "../Services/employeeService";
import { employees } from "../../../data/employees";
import { Employee } from "../models/employeeModel";
import { successResponse, errorResponse } from "../models/responsemodel";

// For Get all method
export const getAllEmployees = (req: Request, res: Response): void => {
  try {
    const allEmployees: Employee[] = employeeService.getAllEmployees();
    res
      .status(200)
      .json(successResponse(allEmployees, "All employees retrieved successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to retrieve employees"));
  }
};

// For Create method 
export const createEmployee = (req: Request, res: Response): void => {
  try {
    const newEmployee: Employee = req.body;

    if (!newEmployee.name || !newEmployee.position || !newEmployee.department) {
      res.status(400).json(errorResponse("Missing required fields"));
      return;
    }

    const createdEmployee = employeeService.createEmployee(newEmployee);
    res
      .status(201)
      .json(successResponse(createdEmployee, "Employee created successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to create employee"));
  }
};

// For update method
export const updateEmployee = (req: Request, res: Response): void => {
  try {
    const id: number = Number(req.params.id);
    const updatedData = req.body;
    const updatedEmployee = employeeService.updateEmployee(id, updatedData);

    if (updatedEmployee) {
      res
        .status(200)
        .json(successResponse(updatedEmployee, "Employee updated successfully"));
    } else {
      res.status(404).json(errorResponse("Employee not found"));
    }
  } catch (error) {
    res.status(500).json(errorResponse("Failed to update employee"));
  }
};

// For deleteion method
export const deleteEmployee = (req: Request, res: Response): void => {
  try {
    const id: number = Number(req.params.id);
    const deleted = employeeService.deleteEmployee(id);

    if (deleted) {
      res
        .status(200)
        .json(successResponse(null, "Employee deleted successfully"));
    } else {
      res.status(404).json(errorResponse("Employee not found"));
    }
  } catch (error) {
    res.status(500).json(errorResponse("Failed to delete employee"));
  }
};

// for get EmploueeByID method
export const getEmployeeByID = (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    const employee = employees.find((emp) => emp.id === id);

    if (!employee) {
      res.status(404).json(errorResponse("Employee not found"));
      return;
    }

    res.status(200).json(successResponse(employee, "Employee retrieved"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to retrieve employee"));
  }
};
// For additional logical operators

// Get employees by BranchId
export const getEmployeesByBranch = (req: Request, res: Response): void => {
  try {
    const branchId = parseInt(req.params.branchId, 10);

    if (!branchId || branchId <= 0) {
      res.status(400).json(errorResponse("Invalid branchId"));
      return;
    }

    const result = employeeService.getEmployeesByBranch(branchId);
    res.status(200).json(successResponse(result, "Employees by branch retrieved"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to get employees by branch"));
  }
};

// Get employees by department
export const getEmployeesByDepartment = (req: Request, res: Response): void => {
  try {
    const department = req.params.department;

    if (!department) {
      res.status(400).json(errorResponse("Department is required"));
      return;
    }

    const result = employees.filter((emp) => emp.department === department);
    res.status(200).json(successResponse(result, "Employees by department retrieved"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to get employees by department"));
  }
};
