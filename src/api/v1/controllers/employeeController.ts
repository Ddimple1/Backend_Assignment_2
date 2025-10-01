import { Request, Response } from "express";
import * as employeeService from "../Services/employeeService";

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
  }

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