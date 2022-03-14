require('dotenv').config();
const mysql = require("mysql2")
const express = require("express")
const console = require('console.table')
const inquirer = require('inquirer');
const res = require('express/lib/response');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'employees_db',
});

const whatWouldYouLikeToDo = () => {
    inquirer.prompt([
        {
            name: 'whatWouldYouLikeToDo',
            message: 'What would you like to do?',
            type: "list",
            choices: ["Add Department", "Add Role", 'Add Employee']
        }
    ]).then((ans) => {
        if(ans.whatWouldYouLikeToDo === "Add Department"){
            inquirer.prompt([
                {
                    name: "nameOfDepartment",
                    message: "What is the name of the department?",
                    type: "input"
                }.then((ans) => {
                    const query = `INSERT INTO department(name) VALUES ${ans};`;
                    db.query(query, (err, result) => {
                        if(err){
                            return res.json(err)
                        }
                        res.json(result);
                    })
                })
            ])
        }else if(ans.whatWouldYouLikeToDo === "Add Role"){
            inquirer.prompt([
                {
                    name: "nameOfRole",
                    message: "What is the name of the role?",
                    type: 'input'
                }
            ]).then((ans) => {
                const query = `INSERT INTO role(title) VALUES ${ans};`;
                db.query(query, (err, result) => {
                    if(err){
                        return res.json(err)
                    }
                    res.json(result);
                })
            }).then(() => {
                inquirer.prompt([
                    {
                        name: "roleSalary",
                        message: "What is the salary of the role?",
                        type: "number"
                    }
                ]).then((ans) => {
                    const query = `INSERT INTO role(salary) VALUES ${ans};`;
                })
            })
        }
    })
}