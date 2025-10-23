import { PrismaClient } from "@prisma/client";
const client = new PrismaClient()

// I create Function to store Department  
const createDepartment = async (id,departmentName,location) => {
    try{
    const newDepartment =await client.department.create({
        data : {id : id,departmentName: departmentName,location : location}
    });
    console.log("Department created ",newDepartment);
    }catch(error){
        console.log("Error creating department",error);
    }
}

//  Function to get all Departments and their Employees
async function getDepartments(){
    try{
    const departments = await client.department.findMany({
        include : {
            employee : true // 👈 match the relation name in schema
        }
    });
    console.log(departments);
    }catch(error){
        console.log("Error getting departments",error);
    }
}


 // Function to get a single department by ID
async function getDepartment(id) {
  try {
    // Fetch department with matching ID
    const department = await client.department.findUnique({
      where: { id: id },
    });

    // Check if the department exists
    if (department) {
      console.log("✅ Department found:");
      console.log(department);
    } else {
      console.log("⚠️ Department not found");
    }
  } catch (error) {
    console.error("❌ Error fetching department:", error);

  }
}

// // Example usage (for testing)
// getDepartment("DPT002");


//6.Delete Department
async function deleteDepartment(id) {
    try{
    const deletedDepartment = await client.department.delete({
        where: {
            id: id // find by primary key (Department ID)
        }
    });
    console.log(deletedDepartment);
    return deletedDepartment;
    }catch(error){
        console.log("Error deleting department",error);
    }   
}

//deleteDepartment("DPT001")

//  7.Update Deparment
async function updateDepartment(id, location) {
    try{
    const updatedDepartment = await client.department.update({
        where: {
            id: id
        },
        data: {
            location: location
        }
    });
    console.log(updatedDepartment);
    return updatedDepartment;
    }catch(error){
        console.log("Error updating department",error);
    }
}

//updateDepartment("DPT004", "Murang'a Campus")


// 8.Function to create a new Employee
async function createEmployee(id, firstName, lastName, email, salary, departmentId) {
  try {
    const newEmployee = await client.employee.create({
      data: {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        salary: salary,
        departmentId: departmentId, // must match an existing Department ID
      },
    });
    console.log("✅ Employee created:", newEmployee);
  } catch (error) {
    console.error("❌ Error creating employee:", error);
  }
}


//createEmployee("EMP001", "John", "Mwangi", "john.mwangi@company.com", 65000.00, "DPT001");
// createEmployee("EMP002", "Alice", "Otieno", "alice.otieno@company.com", 92000.00, "DPT002");
// createEmployee("EMP003", "Brian", "Kariuki", "brian.kariuki@company.com", 88000.00, "DPT003");
// createEmployee("EMP004", "Grace", "Mutua", "grace.mutua@company.com", 97000.00, "DPT004");
// createEmployee("EMP005", "Kevin", "Omondi", "kevin.omondi@company.com", 66000.00, "DPT005");
// createEmployee("EMP006", "Linda", "Njeri", "linda.njeri@company.com", 91000.00, "DPT001");
// createEmployee("EMP007", "Samuel", "Kiptoo", "samuel.kiptoo@company.com", 63000.00, "DPT002");
// createEmployee("EMP008", "Mary", "Wanjiku", "mary.wanjiku@company.com", 89000.00, "DPT003");
// createEmployee("EMP009", "Peter", "Kamau", "peter.kamau@company.com", 95000.00, "DPT004");
// createEmployee("EMP010", "Faith", "Achieng", "faith.achieng@company.com", 78000.00, "DPT005");
// createEmployee("EMP011", "Ann", "Chebet", "ann.chebet@company.com", 78000.00, "DPT003");



// 9.Get all Employees

async function getEmployees() {
  try {
    const employees = await client.employee.findMany({
      include: {
        department: true, // 👈 include the related Department data
      },
    });
    console.log("✅ All Employees with Department details:");
    console.log(employees);
    return employees;
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
  }
}


// 10.Function to get Employees by Salary Range
async function getBySalaryRange(min, max) {
  try {
    // Validation: ensure min is not greater than max
    if (min > max) {
      throw new Error("Minimum cannot be greater than maximum");
    }

    // Query employees whose salary is between min and max
    const employees = await client.employee.findMany({
      where: {
        salary: {
          gte: min, // greater than or equal to min
          lte: max, // less than or equal to max
        },
      },
      include: {
        department: true, // include department details for context
      },
    });

    console.log(`✅ Employees earning between ${min} and ${max}:`);
    console.log(employees);
    return employees;
  } catch (error) {
    console.error("❌ Error fetching employees by salary range:", error.message);
  }
}


// 11.Function to delete an Employee by ID
async function deleteEmployee(id) {
  try {
    const deletedEmployee = await client.employee.delete({
      where: { id: id }, // use the employee ID to find and delete
    });

    console.log("✅ Employee deleted successfully:");
    console.log(deletedEmployee);
    return deletedEmployee;
  } catch (error) {
    console.error("❌ Error deleting employee:", error.message);
  }
}

//12 Function to update an employee's salary
async function updateEmployee(id, newSalary) {
  try {
    const updatedEmployee = await client.employee.update({
      where: { id: id },          // Find employee by ID
      data: { salary: newSalary } // Update salary field
    });

    console.log("✅ Employee salary updated successfully:");
    console.log(updatedEmployee);
    return updatedEmployee;
  } catch (error) {
    console.error("❌ Error updating employee:", error.message);
  }
}