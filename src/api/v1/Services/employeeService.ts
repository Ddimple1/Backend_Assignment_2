import {employees, Employee } from "../../../data/employees";

export const getAllEmployees = (): Employee[] => {
    return employees;
};

export const createEmployee = (employee: Omit<Employee, "id">): Employee => {
    const newEmployee: Employee = {
        id: employees.length + 1, // simple ID generation
        ...employee,
    };
    employees.push(newEmployee);
    return newEmployee;
};

export const updateEmployee = (id: number, updatedEmployee: Partial<Employee>): Employee | null => {
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
        employees[index] = { ...employees[index], ...updatedEmployee};
        return employees[index];
    }
    return null;
};

export const deleteEmployee = (id: number): boolean => {
    const index = employees.findIndex (emp => emp.id === id);
    if (index !== -1) {
        employees.splice(index, 1);
        return true;
    }
    return false;
};

// Additional logical operators

// Get employees by branchId
export const getEmployeesByBranch = (branchId: number): Employee[] => {
    return employees.filter(employee => employee.branchId === branchId);
};

// Get employees by department
export const getEmployeesByDepartment = (department: string): Employee[] => {
    return employees.filter(employee => employee.department === department);
};