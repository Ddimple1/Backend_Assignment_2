import { Request, Response } from "express";
import * as branchService from "../Services/brancheService";
import { Branch } from "../../../data/branches";
import { errorResponse, successResponse } from "../models/responsemodel";

// Get all Branches
export const getAllBranches = (req: Request, res: Response): void => {
   try {
    const allBranches: Branch[] = branchService.getAllBranches();
    res.status(200).json(successResponse(allBranches, "All branches retrieved successfully."));
   } catch (error) {
    res.status(500).json(errorResponse("Failed to retrieve branches"));
   }
};

// Create new Branch
export const createBranch = (req: Request, res: Response): void => {
  try {
    const { name, address, phone } = req.body;

    if (!name || !address || !phone) {
      res.status(400).json(errorResponse("Missing required fields"));
      return;
    }

    const newBranch: Branch = {
      id: branchService.getAllBranches().length + 1, // Assign new ID
      name,
      address,
      phone,
    };

    branchService.createBranch(newBranch);
    res
      .status(201)
      .json(successResponse(newBranch, "Branch created successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to create branch"));
  }
};

// Update Branch 
export const updateBranch = (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id, 10);
    const branch = branchService.getBranchById(id);

    if (!branch) {
      res.status(404).json(errorResponse("Branch not found"));
      return;
    }

    const { name, address, phone } = req.body;
    const updatedBranch: Branch = {
      ...branch,
      name: name || branch.name,
      address: address || branch.address,
      phone: phone || branch.phone,
    };

    branchService.updateBranch(id, updatedBranch);
    res
      .status(200)
      .json(successResponse(updatedBranch, "Branch updated successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to update branch"));
  }
};

// Delete Branch 
export const deleteBranch = (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id, 10);
    const branch = branchService.getBranchById(id);

    if (!branch) {
      res.status(404).json(errorResponse("Branch not found"));
      return;
    }

    branchService.deleteBranch(id);
    res.status(200).json(successResponse(null, "Branch deleted successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to delete branch"));
  }
};

export const getBranchById = (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id, 10);
    const branch = branchService.getBranchById(id);

    if (!branch) {
      res.status(404).json(errorResponse("Branch not found"));
      return;
    }

    res.status(200).json(successResponse(branch, "Branch retrieved successfully"));
  } catch (error) {
    res.status(500).json(errorResponse("Failed to retrieve branch"));
  }
};