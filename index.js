const inquirer = require('inquirer')
const mysql = require('mysql2')
const cTable = require('console.table')

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
                    updateRole();
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
    db.query(`SELECT id, first_name, last_name FROM employees`, (err, results) => {
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
    db.query(`SELECT * FROM roles`, (err, results) => {
        if (err) throw err;
        console.table(results);
        returnManager();
    })
}

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
                console.log('Role Updated')
                returnManager();
            });
        });
};

// END APPLICATION
function endManager() {
    db.end();
}

// RELAUNCH OPTIONS
function returnManager() {
    beginManager();
}

// BEGIN APPLICATION
beginManager();