import {Branch, branches} from "../../../data/branches";

export const getAllBranches = (): Branch[] => {
    return branches;
};

export const createBranch = (branch: Branch): string => {
    branches.push(branch);
    return "Branch added successfully."
};

export const updateBranch = (id: number, updatedBranch: Branch): string => {
    const index = branches.findIndex(branches => branches.id === id);
    if (index !== -1) {
        branches[index] = updatedBranch;
        return "Branch updated";
    }
    return "Branch not found";
};

export const deleteBranch = (id: number): string => {
    const index = branches.findIndex(branches => branches.id === id);
    if (index !== -1) {
        branches.splice(index, 1);
        return "Branch deleted";
    }
    return "Branch not found";
};