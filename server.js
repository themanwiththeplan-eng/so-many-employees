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
            choices: ["Add Department", "Add Role", 'Add Employee'];
        }
    ]).then((ans) => {
        if(ans.whatWouldYouLikeToDo === "Add Department"){
            inquirer.prompt([
                {
                    name: "nameOfDepartment",
                    message: "What is the name of the department?",
                    type: "input"
                }.then((ans) => {
                    const query = `INSERT INTO department(${ans});`;
                    db.query(query, (err, result) => {
                        if(err){
                            return res.json(err)
                        }
                        res.json(result);
                    })
                })
            ])
        }
    })
}