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
            name: 'pick',
            message: "Choose one of the following"
        }
    ]).then((ans) => {
        switch (ans.pickSomething){
            case 'View all Departments':
                // initiate viewing departments
                break;
            case 'View all roles':
                // initiate viewing roles
                break;
            case 'View all employees':
                // initiate viewing employees
                break;
            case 'Add a department':
                // initiate adding a department
                break;
            case 'Add a role':
                // initiate adding a role
                break;
            case 'Add employee':
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




app.listen(PORT, () => {
    console.log(`You are now listening on port ${PORT}`);
});