import { Request, Response } from "express";
import * as branchService from "../Services/brancheService";
import {branches, Branch } from "../../../data/branches";

// Get all Branches
export const getAllBranches = (req: Request, res: Response): void => {
    const result = branchService.getAllBranches();
    res.status(200).json(result);
};

// Create new Branch
export const createBranch = (req: Request, res: Response): void => {
    const {name, address, phone} = req.body;

    if(!name || !address || !phone) {
        res.status(400).json({message: "Missing required fields."});
        return;
    }

    const newBranch: Branch = {
        id: branches.length + 1, // for assigning new ID
        name,
        address,
        phone
    };

    branchService.createBranch(newBranch);
    res.status(201).json(newBranch);
};

// Update Branch 
export const updateBranch = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const branch = branches.find(b => b.id === id);

    if (!branch) {
        res.status(404).json({ message: "Branch not found" });
        return;
    }

    const { name, address, phone } = req.body;
    const updatedBranch: Branch = {
        ...branch,
        name: name || branch.name,
        address: address || branch.address,
        phone: phone || branch.phone
    };

    branchService.updateBranch(id, updatedBranch);
    res.status(200).json(updatedBranch );
};
// Delete Branch 
export const deleteBranch = (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    const branch = branches.find(branch => branch.id === id);

    if (!branch) {
        res.status(404).json({message: "Branch not found"});
        return;
    }

    branchService.deleteBranch(id);
    res.status(200).json({message: "Branch deleted."});
};

export const getBranchById = (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const branch = branchService.getBranchById(id);

  if (!branch) {
    return res.status(404).json({ message: "Branch not found" });
  }

  return res.status(200).json({ data: branch });
};