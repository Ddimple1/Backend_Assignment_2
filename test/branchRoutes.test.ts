import request from "supertest";
import app from "../src/app";

// Get all branches
describe ("Branch API", () => {
    // Arrange & Act
    it("should return all branches", async () => {
        const res = await request(app).get("/api/v1/branches");

        //Assert
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
     })
});

// create branches
describe("POST /api/v1/branches", () => {
        it("should create a new branch", async () => {
            // ARRANGE
            const newBranch = { name: "East Branch", address: "789 East St", phone: "555-666-7777" };

            // ACT
            const res = await request(app).post("/api/v1/branches").send(newBranch);

            // ASSERT
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("id");
            expect(res.body.name).toBe("East Branch");
        });

        it("should return 400 for missing fields", async () => {
            // ARRANGE
            const badBranch = { name: "Bad Branch" };

            // ACT
            const res = await request(app).post("/api/v1/branches").send(badBranch);

            // ASSERT
            expect(res.status).toBe(400);
        });
    });

// Update branch
    it("should update a branch", async () => {
        // ARRANGE
        const branchId = 1;
        const updatedData = { phone: "555-000-1111" };

        // ACT
        const res = await request(app).put(`/api/v1/branches/${branchId}`).send(updatedData);

        // ASSERT
        expect(res.status).toBe(200);
        expect(res.body.phone).toBe("555-000-1111");
    });

    it("should return 404 when updating non-existent branch", async () => {
        // ARRANGE
        const branchId = 999;
        const updatedData = { phone: "555-999-8888" };

        // ACT
        const res = await request(app).put(`/api/v1/branches/${branchId}`).send(updatedData);

        // ASSERT
        expect(res.status).toBe(404);
    });

// for Deleting branch 
    it("should delete a branch", async () => {
        // ARRANGE
        const branchId = 1;

        // ACT
        const res = await request(app).delete(`/api/v1/branches/${branchId}`);

        // ASSERT
        expect(res.status).toBe(200);
    });

    it("should return 404 when deleting non-existent branch", async () => {
        // ARRANGE
        const branchId = 999;

        // ACT
        const res = await request(app).delete(`/api/v1/branches/${branchId}`);

        // ASSERT
        expect(res.status).toBe(404);
    });
