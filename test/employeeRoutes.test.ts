import request from "supertest";
import app from "../src/app";
import { employees } from "../src/data/employees";

//Tests for employee endpoints

// Get all Employees
describe("Get /api/v1/employees", () => {
    it("should return all employees", async () => {
        // Arrange & Act
        const res = await request(app).get("/api/v1/employees");

        // Assert
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body.data)).toBe(true);
    });
});

// Create new Employee
describe("Post /api/v1/employees", () => {
    it("should successfully create a new employee", async() => {
        // Arrange
        const newEmployee = {
            name: "Dimple",
            position: "Executive",
            department: "Student Association",
            email: "dimpl@example.com",
            phone: "143-765-3546",
            branchId: 1
        };

        // Act
        const res = await request(app).post("/api/v1/employees").send(newEmployee);

        // Assert
        expect(res.status).toBe(201);
        expect(res.body.data).toHaveProperty("id");
        expect(res.body.data.name).toBe("Dimple")
    });

    it("should return 400 when required field are missing", async() => {
        // Arrange
        const incompleteinformation = { position: "Student"};

        // act
        const res = await request(app).post("/api/v1/employees").send(incompleteinformation);
        
        // Assert
        expect(res.status).toBe(400);
    });
});

// UPDATE Employee
describe("PUT /api/v1/employees/:id", () => {
    it("should update an existing employee", async () => {
      // ARRANGE
      const updateData = { position: "Senior Developer" };

      // ACT
      const res = await request(app).put("/api/v1/employees/1").send(updateData);

      // ASSERT
      expect(res.status).toBe(200);
      expect(res.body.data.position).toBe("Senior Developer");
    });

    it("should return 404 when updating non-existent employee", async () => {
      // ARRANGE
      const updateData = { position: "Manager" };

      // ACT
      const res = await request(app).put("/api/v1/employees/101").send(updateData);

      // ASSERT
      expect(res.status).toBe(404);
    });
  });

// DELETE Employee
describe("DELETE /api/v1/employees/:id", () => {
    it("should delete an existing employee", async () => {
      // ARRANGE
      const employeeId = 1;

      // ACT
      const res = await request(app).delete(`/api/v1/employees/${employeeId}`);

      // ASSERT
      expect(res.status).toBe(200);
    });

    it("should return 404 when deleting non-existent employee", async () => {
      // ARRANGE
      const employeeId = 101;

      // ACT
      const res = await request(app).delete(`/api/v1/employees/${employeeId}`);

      // ASSERT
      expect(res.status).toBe(404);
    });

});

// GetemployeeByID test case
describe("GET /api/v1/employees/:id", () => {
  it("should return an employee by ID from existing data", async () => {
    // Pick an existing employee from the data file
    const existingEmployee = employees[0]; // for example, the first employee
    const employeeId = existingEmployee.id;

    const res = await request(app).get(`/api/v1/employees/${employeeId}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("id", employeeId);
    expect(res.body.data.name).toBe(existingEmployee.name);
    expect(res.body.data.position).toBe(existingEmployee.position);
  });

  it("should return 404 for a non-existent employee ID", async () => {
    const res = await request(app).get("/api/v1/employees/999"); // 
    expect(res.status).toBe(404);
  });
});