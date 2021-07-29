INSERT INTO departments (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal")

INSERT INTO roles (id, tile, salary, department_id)
VALUES (001, "Strategic Partner Manager", 65000, 1),
       (002, "Sales Director", 100000, 1),
       (003, "Full Stack Software Engineer", 120000, 2),
       (004, "Application Developer", 125000, 2),
       (005, "Controller", 130000, 3),
       (006, "Analyst", 150000, 3),
       (007, "Head Counsel", 200000, 4),
       (008, "Compliance Officer", 250000, 4)

INSERT INTO employees (id, first_name, last_name, role_id, manager_id)
VALUES (200, "Charlie", "Kelly", 001, 100),
       (201, "Ronald 'Mac'", "McDonald", 002, 100),
       (202, "Dennis", "Reynolds", 003, 101),
       (203, "Dee", "Reynolds", 004, 101),
       (204, "Frank", "Reynolds", 005, 102),
       (205, "Artemis", "DuBois", 006, 102),
       (206, "Bonnie", "Kelly", 007, 103),
       (207, "Brad", "Fisher", 008, 103) 