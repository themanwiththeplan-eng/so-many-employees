CREATE TABLE department(
	id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE role(
	id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2),
    department_id INTEGER NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department(id),
    PRIMARY KEY(id)
);

CREATE TABLE employee(
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    FOREIGN KEY(role_id) REFERENCES role(id),
    PRIMARY KEY(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
);