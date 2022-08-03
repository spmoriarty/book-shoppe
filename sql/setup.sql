-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists authors;
DROP table if exists books;

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
('Aldous Huxley', 1894, 'Surrey, England'),
('Eric Arthur Blair', 1903, 'Motihari, British India'),
('F. Scott Fitzgerald', 1896, 'Saint Paul, Minnesota'),
('Franz Kafka', 1883, 'Prague, Kingdom of Bohemia');



INSERT INTO books (title, released) VALUES
('Brave New World', 1932),
('1984', 1949),
('The Great Gatsby', 1925),
('Amerika', 1927);