import { branchSchema } from "../src/api/v1/Validation/branchValidation";

describe("Branch Validation Schema", () => {
    it("should pass with valid branch data", () => {
        const validData = {
            name: "Downtown Branch",
            address: "123 Main Street",
            phone: "2045551234" 
        };

        const { error } = branchSchema.validate(validData);
        expect(error).toBeUndefined(); 
    });

    it("should fail when name is missing", () => {
        const invalidData = {
            address: "123 Main Street",
            phone: "2045551234"
        };

        const { error } = branchSchema.validate(invalidData);
        expect(error).toBeDefined(); 
    });
});