
-- Connect to database trivia before running queries.
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
SELECT * FROM games;
SELECT * FROM questions;
SELECT * FROM game_answers;