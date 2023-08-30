CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(124) NOT NULL UNIQUE,
    password VARCHAR(1024) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now() 
);

CREATE TABLE projects(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    user_id INT NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now() 
);

CREATE TABLE tasks(
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    due_date DATE,
    is_done BOOLEAN DEFAULT false,
    user_id INT NOT NULL REFERENCES users(id),
    project_id INT NOT NULL REFERENCES projects(id),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE blacklist_token(
    id SERIAL PRIMARY KEY,
    jti VARCHAR(36) NOT NULL UNIQUE
);
