INSERT INTO departments (dept_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("SPM", 65000, 1),
       ("Sales Director", 100000, 1),
       ("Full Stack Engineer", 120000, 2),
       ("Application Developer", 125000, 2),
       ("Controller", 130000, 3),
       ("Analyst", 150000, 3),
       ("Head Counsel", 200000, 4),
       ("Compliance Officer", 250000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Charlie", "Kelly", 1, 1),
       ("Ronald 'Mac'", "McDonald", 2, 1),
       ("Dennis", "Reynolds", 3, 2),
       ("Dee", "Reynolds", 4, 2),
       ("Frank", "Reynolds", 5, 3),
       ("Artemis", "DuBois", 6, 3),
       ("Bonnie", "Kelly", 7, 4),
       ("Brad", "Fisher", 8, 4);
