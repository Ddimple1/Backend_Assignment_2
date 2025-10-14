import { Request, Response, NextFunction } from "express";
import { employeeSchema } from "../Validation/employeeValidation";
import { branchSchema } from "../Validation/branchValidation";

export const validateEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { error } = employeeSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

export const validateBranch = (req: Request, res: Response, next: NextFunction) => {
  const { error } = branchSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};