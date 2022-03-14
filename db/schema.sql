CREATE TABLE department(
	id INTEGER NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role(
	id INTEGER NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(8,2),
    department_id INTEGER,
    FOREIGN KEY(department_id) REFERENCES department(id),
    PRIMARY KEY(id)
);

CREATE TABLE employee(
	id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY(role_id) REFERENCES role(id),
    PRIMARY KEY(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);