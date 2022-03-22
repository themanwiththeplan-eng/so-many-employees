CREATE TABLE department(
	id INTEGER AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role(
	id INTEGER AUTO_INCREMENT,
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
    manager_id INT,
    FOREIGN KEY(role_id) REFERENCES role(id),
    PRIMARY KEY(id)
);