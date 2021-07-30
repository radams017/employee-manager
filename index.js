// IMPORT MODULES
const inquirer = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')

// CREATE DB CONNECTION
const db = mysql.createConnection({
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: '',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

// LAUNCHES INQUIRER
function beginManager() {

    inquirer
        .prompt([{
            type: 'list',
            message: 'What Do You Want To Do?',
            name: 'promptSelector',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        }])
        .then(prompt => {
            switch (prompt.promptSelector) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "View All Roles":
                    viewRoles();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "View All Departments":
                    viewDepartments();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Quit":
                    endManager();
                    break;
            }
        })
}

// VIEW ALL ROLES
function viewEmployees() {
    db.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title, 
    departments.dept_name, roles.salary FROM employees 
    INNER JOIN roles ON employees.role_id = roles.id
    INNER JOIN departments ON roles.department_id = departments.id ORDER BY employees.id`, (err, results) => {
        if (err) throw err;
        console.table(results);
        returnManager();
    });
}

// VIEW ALL DEPARTMENTS
function viewDepartments() {
    db.query(`SELECT * FROM departments`, (err, results) => {
        if (err) throw err;
        console.table(results);
        returnManager();
    })
}

// VIEW ALL ROLES
function viewRoles() {
    db.query(`
    SELECT roles.id, roles.title, roles.salary, departments.dept_name FROM roles
    INNER JOIN departments on roles.department_id = departments.id ORDER BY roles.id;`, (err, results) => {
        if (err) throw err;
        console.table(results);
        returnManager();
    })
}

// ADD ROLES TO DATABASE
function addRole() {
    inquirer
        .prompt([{
                type: 'input',
                name: 'roleName',
                message: 'What Role Would You Like To Add?'
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What Is The Salary?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What Department',
                choices: [
                    "Sales",
                    "Engineering",
                    "Finance",
                    "Legal",
                ]
            }
        ])
        .then(async (response) => {

            let deptID = await db.promise().query(`SELECT id FROM departments WHERE dept_name = "${response.department}"`)
            deptID[0].forEach(object => {
                deptID = object["id"]
            });

            db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`, [response.roleName, response.roleSalary, deptID], (err, results) => {
                if (err) throw err;
                console.log('New Role Succesfully Added')
                returnManager();
            });
        });
};

// ADD DEPARTMENT TO DATABASE
function addDepartment() {
    inquirer
        .prompt([{
            type: 'input',
            name: 'deptName',
            message: 'What Department Would You Like To Add?'
        }])
        .then(response => {
            db.query(`INSERT INTO departments (dept_name) VALUES (?)`, [response.deptName], (err, results) => {
                if (err) throw err;
                console.log('New Department Succesfully Added')
                returnManager();
            })

        })
}

// ADD EMPLOYEE TO DATABASE
async function addEmployee() {

    let roles = await db.promise().query(`SELECT title FROM roles`);
    let roleContainer = [];
    roles[0].forEach(object => {
        roleContainer.push(object['title'])
    })

    inquirer
        .prompt([{
                type: 'input',
                name: 'empFirstName',
                message: 'First Name?'
            },
            {
                type: 'input',
                name: 'empLastName',
                message: 'Last Name?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'Role?',
                choices: roleContainer
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Manager? Select Not Applicable If None',
                choices: [
                    'Not Applicable'
                ]
            },
        ])
        .then(async (response) => {

            let roleID = await db.promise().query(`SELECT id FROM roles WHERE title = "${response.role}"`)
            roleID[0].forEach(object => {
                roleID = object["id"]
            })

            db.query(`INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)`, [response.empFirstName, response.empLastName, roleID], (err, results) => {
                if (err) throw err;
                console.log('New Employee Succesfully Added')
                returnManager();
            });
        });
};

// UPDATE EMPLOYEE
async function updateEmployeeRole() {
    let employees = await db.promise().query(`SELECT CONCAT (first_name," ",last_name) AS name FROM employees`);
    let employeeContainer = [];
    employees[0].forEach(object => {
        employeeContainer.push(object['name'])
    });

    let roles = await db.promise().query(`SELECT title FROM roles`);
    let roleContainer = [];
    roles[0].forEach(object => {
        roleContainer.push(object['title'])
    });

    inquirer
        .prompt([{
                type: 'list',
                name: 'empName',
                message: 'Select Employee To Update',
                choices: employeeContainer
            },
            {
                type: 'list',
                name: 'role',
                message: 'Select New Role to Assign To Employee',
                choices: roleContainer
            },
        ])
        .then(async (response) => {

            let roleID = await db.promise().query(`SELECT id FROM roles WHERE title = "${response.role}"`)
            roleID[0].forEach(object => {
                roleID = object["id"]
            })

            db.query(`UPDATE employees SET role_id="${roleID}" WHERE CONCAT (first_name," ",last_name)="${response.empName}"`, (err, results) => {
                if (err) throw err;
                console.log('Employee Updated')
                returnManager();
            });
        });
}

// END APPLICATION
function endManager() {
    db.end();
}

// RELAUNCH OPTIONS
function returnManager() {
    beginManager();
}

// PARSES SEQUELIZE OBJECT INTO ARRAY
function objectParser(value) {
    let container = [];
    value[0].forEach(object => {
        container.push(object['title'])
    })
};

// BEGIN APPLICATION
beginManager();