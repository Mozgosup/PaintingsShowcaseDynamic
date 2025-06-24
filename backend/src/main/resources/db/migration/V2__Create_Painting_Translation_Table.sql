CREATE TABLE painting_translation
(
    id          SERIAL PRIMARY KEY,
    painting_id BIGINT       NOT NULL REFERENCES painting (id) ON DELETE CASCADE,
    language    VARCHAR(3)   NOT NULL,
    name        VARCHAR(255) NOT NULL,
    UNIQUE (painting_id, language)
);

ALTER TABLE painting
DROP
COLUMN name;
