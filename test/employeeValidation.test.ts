import { employeeSchema } from "../src/api/v1/Validation/employeeValidation";

describe("Employee Validation Schema", () => {
    it("should pass with valid data", () => {
        const validData = {
            name: "Alice",
            position: "Developer",
            email: "alice@example.com",
            branchId: 1,
            department: "IT"
        };
        const { error } = employeeSchema.validate(validData);
        expect(error).toBeUndefined();
    });

    it("should fail when email is missing", () => {
        const invalidData = {
            name: "Alice",
            position: "Developer",
            branchId: 1,
            department: "IT"
        };
        const { error } = employeeSchema.validate(invalidData);
        expect(error).toBeDefined();
    });
});
