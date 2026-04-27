import { Employee } from "../models/employee.model.js";

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ employeeId: 1 });
    return res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

// Get single employee by employeeId
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findOne({ employeeId: id });

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("Error fetching employee:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch employee",
    });
  }
};
