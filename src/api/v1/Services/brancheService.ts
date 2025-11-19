import {Branch} from "../models/branchmodel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const COLLECTION_NAME = "branches";

/**
 * Get all branches.
 */
export const getAllBranches = async (): Promise<Branch[]> => {
  try {
    const snapshot = await firestoreRepository.getDocuments(COLLECTION_NAME);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Branch));
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch branches: ${errorMessage}`);
  }
};

/**
 * Get a branch by ID.
 */
export const getBranchById = async (id: string): Promise<Branch | null> => {
  try {
    const doc = await firestoreRepository.getDocumentById(COLLECTION_NAME, id);
    if (!doc || !doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Branch;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch branch ${id}: ${errorMessage}`);
  }
};

/**
 * Create a new branch.
 */
export const createBranch = async (branch: Branch): Promise<string> => {
  try {
    return await firestoreRepository.createDocument(COLLECTION_NAME, branch);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to create branch: ${errorMessage}`);
  }
};

/**
 * Update an existing branch.
 */
export const updateBranch = async (branch: Branch): Promise<void> => {
  try {
    await firestoreRepository.updateDocument(COLLECTION_NAME, branch.id, branch);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to update branch ${branch.id}: ${errorMessage}`);
  }
};

/**
 * Delete a branch.
 */
export const deleteBranch = async (branch: Branch): Promise<void> => {
  try {
    await firestoreRepository.deleteDocument(COLLECTION_NAME, branch.id);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to delete branch ${branch.id}: ${errorMessage}`);
  }
};