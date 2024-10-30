CREATE TABLE painting
(
    id        SERIAL PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    year      INTEGER,
    height    INTEGER,
    width     INTEGER,
    image_url VARCHAR(255) NOT NULL
);
