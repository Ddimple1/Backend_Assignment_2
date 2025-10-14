import express, { Router } from "express";
import * as branchController from "../Controllers/branchController";
import { validateBranch } from "../middleware/logRequest";

const router: Router = express.Router();

router.get("/", branchController.getAllBranches);
router.post("/", validateBranch, branchController.createBranch);
router.put("/:id",validateBranch,  branchController.updateBranch);
router.delete("/:id", validateBranch, branchController.deleteBranch);
router.get("/:id", branchController.getBranchById);

export default router;
