

CREATE TABLE IF NOT EXISTS users
(
    user_id  SERIAL PRIMARY KEY,
    name VARCHAR(50)  NOT NULL,
    password VARCHAR(255) NOT NULL,
    email    VARCHAR(100) NOT NULL UNIQUE
);

-- roles

CREATE TABLE IF NOT EXISTS roles
(
    role_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- user_roles

CREATE TABLE IF NOT EXISTS user_roles
(
    user_id INT REFERENCES users (user_id) ON DELETE CASCADE,
    role_id INT REFERENCES roles (role_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);




