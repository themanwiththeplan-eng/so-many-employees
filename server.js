require('dotenv').config();
const mysql = require("mysql2")
const express = require("express")
const cTable = require('console.table')
const inquirer = require('inquirer');
const res = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'employees_db',
    },

);

db.connect((err) => {
    if (err) throw err;
    // call function to initiate here
    pickSomething();
});

function pickSomething() {
    inquirer.prompt([
        {
            type: 'list',
            choices: ['View all Departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add employee',
                'Update employee role',
                'Done!'
            ],
            name: 'pickSomething',
            message: "Choose one of the following"
        }
    ]).then((ans) => {
        switch (ans.pickSomething){
            case 'View all Departments':
                // initiate viewing departments
                departments()
                break;
            case 'View all roles':
                // initiate viewing roles
                roles()
                break;
            case 'View all employees':
                employees()
                // initiate viewing employees
                break;
            case 'Add a department':
                addDepartment()
                // initiate adding a department
                break;
            case 'Add a role':
                addRole();
                // initiate adding a role
                break;
            case 'Add employee':
                addEmployee();
                // initiate adding and employee
                break;
            case 'Update employee role':
                // initiate update
                break;
            case 'Done!':
                // initiate done 
                break;
        }
    });
};

const departments = () => {
    let query = `SELECT * FROM department;`;
    db.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        pickSomething()
    })
    
}

const roles = () => {
    let query = `SELECT * FROM role;`;
    db.query(query, (err,res) => {
        if(err) throw err;
        console.table(res);
        pickSomething()
    })
    
}

const employees = () => {
    let query  = `SELECT * FROM employee;`;
    db.query(query, (err, res) => {
        if(err) throw err;
        console.table(res);
        pickSomething()
    })
    
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: `Enter the name of the department you want to add`
        }
    ]).then((ans) => {
        let query = `INSERT INTO department(name) VALUES (?);`;
        db.query(query, [ans.department], (err, res) => {
            if(err) throw err;
            console.log(res);
            pickSomething();
        })
    })
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'role',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'

        },
        {
            type: 'number',
            name: 'dept',
            message: 'What department ID does this role belong to?'

        }
    ]).then((ans) => {
        let query = `INSERT INTO role(title, salary, department_id)  VALUES (?, ?, ?);`;
        db.query(query, [ans.role, ans.salary, ans.dept], (err,res) => {
            if (err) throw err;
            console.log(res);
            pickSomething();
        })
    })
}
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the employees last name?'
        },
        {
            type: 'input',
            name: 'roleId',
            message: 'What is the employees role ID?'
        },
        {
            type: 'input',
            name: 'managerId',
            message: 'If this employee has a manger, what is their ID? If not, set this to 0.'
        }
    ]).then((ans) => {
        if(ans.managerId === ''){
            ans.managerId === null;
        }
        let query = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
        db.query(query, [ans.firstName, ans.lastName, ans.roleId, ans.managerId], (err, res) => {
            if (err) throw err;
            console.log(res);
            pickSomething();
        })
    })
}

app.listen(PORT, () => {
    console.log(`You are now listening on port ${PORT}`);
});