USE art_collective_db;

INSERT INTO Users (username, email, password, createdAt, updatedAt) VALUES
("test1", "test1@test.com", "test", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("test2", "test2@test.com", "test", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Media (title, UserId, createdAt, updatedAt) VALUES
("user1media1", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("user1media2", 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("user2media1", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("user2media2", 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Collectives (title, createdAt, updatedAt) VALUES
("collective1", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);