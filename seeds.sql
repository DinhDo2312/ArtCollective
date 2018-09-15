DROP DATABASE IF EXISTS art_collective_db;
CREATE DATABASE art_collective_db;



USE art_collective_db;
INSERT INTO users (email, username, password, bio, avatar, createdAt, updatedAt)
VALUES ("test@test.com", "testusername", "password", "test", "test", CURRENT_TIME(), CURRENT_TIME())

INSERT INTO media (title, createdAt, updatedAt, UserId) VALUES ("title", current_time(), current_time(), 1)