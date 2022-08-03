-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exist authors
DROP table if exist books

CREATE table authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    name VARCHAR NOT NULL,
    dob INT,
    pob VARCHAR
);


CREATE table books (
    id BIGINT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR NOT NULL,
    released INT NOT NULL
);


INSERT INTO authors (name, dob, pob) VALUES 
('name', 1900, 'place of birth'),



INSERT INTO books (title, released) VALUES
('title', 1900),