-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP table if exists authors;
DROP table if exists books;
DROP table if exists books_authors;

CREATE table authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob INT,
    pob VARCHAR
);


CREATE table books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE table books_authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    book_id BIGINT,
    author_id BIGINT,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
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


INSERT INTO books_authors (book_id, author_id) VALUES
(1,1),
(2,2),
(3,3),
(4,4);