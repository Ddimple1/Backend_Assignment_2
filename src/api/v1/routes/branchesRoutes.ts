import express, { Router } from "express";
import * as branchController from "../Controllers/branchController";
import { validateBranch } from "../middleware/logRequest";

const router: Router = express.Router();

/**
 * @openapi
 * /api/branches:
 *   get:
 *     summary: Retrieve all branches
 *     tags: [Branches]
 *     responses:
 *       '200':
 *         description: Successfully retrieved branches
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/branchValidation'
 *       '500':
 *         description: Server error
 * 
 *   post:
 *     summary: Create a new branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/branchValidation'
 *     responses:
 *       '201':
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/branchValidation'
 *       '400':
 *         description: Validation error
 *       '500':
 *         description: Server error
 * 
  * /api/branches/{id}:
 *   put:
 *     summary: Update an existing branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/branchValidation'
 *     responses:
 *       '200':
 *         description: Branch updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/branchValidation'
 *       '400':
 *         description: Validation error
 *       '404':
 *         description: Branch not found
 *       '500':
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID to delete
 *     responses:
 *       '200':
 *         description: Branch deleted successfully
 *       '404':
 *         description: Branch not found
 *       '500':
 *         description: Server error
 * 
 *   get:
 *     summary: Get a branch by ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Branch ID to retrieve
 *     responses:
 *       '200':
 *         description: Branch retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/branchValidation'
 *       '404':
 *         description: Branch not found
 *       '500':
 *         description: Server error
 */
router.get("/", branchController.getAllBranches);
router.post("/", validateBranch, branchController.createBranch);
router.put("/:id",validateBranch,  branchController.updateBranch);
router.delete("/:id", validateBranch, branchController.deleteBranch);
router.get("/:id", branchController.getBranchById);

export default router;
