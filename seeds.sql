USE art_collective_db;

INSERT INTO Users (username, email, password, createdAt, updatedAt) VALUES
("test1", "test1@test.com", "test", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("test2", "test2@test.com", "test", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Collectives (title, createdAt, updatedAt) VALUES
("collective1", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO UserCollectives (role, createdAt, updatedAt, UserId, CollectiveId) VALUES
("admin", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
("contributor", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1);

INSERT INTO Submissions (title, file, description, type, createdAt, updatedAt, UserId, CollectiveId) VALUES
("bigbooty", "https://cdn.vox-cdn.com/thumbor/1Evq57t9d53K2iHHjc6AkWRSKGA=/0x0:1280x960/1200x800/filters:focal(538x378:742x582)/cdn.vox-cdn.com/uploads/chorus_image/image/57601275/60861120_1280x960.0.0.jpg", "an homage", "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
("penguin", "http://www.animalspot.net/wp-content/uploads/2017/08/Penguin.jpg", "a penguin", "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
("dumb dog", "https://www.thenakedscientists.com/sites/default/files/styles/featured_image/public/media/2007255.jpg?itok=aCwGPSXx", "still smarter than me", "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
("desert", "https://www.desertusa.com/desert-activity/photos/5F3A9074_150422.jpg", "a desert", "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
("piggy", "https://upload.wikimedia.org/wikipedia/en/thumb/2/22/MissPiggy.jpg/220px-MissPiggy.jpg", "miss piggy", "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1);

INSERT INTO Comments (text, createdAt, updatedAt, CollectiveId, UserId, SubmissionId) VALUES
("this collective sucks!", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, null),
("this submission sucks!", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, null, 1, 1);