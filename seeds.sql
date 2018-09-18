USE art_collective_db;

INSERT INTO Users (username, email, password, createdAt, updatedAt) VALUES
("test1", "test1@test.com", "test", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
("test2", "test2@test.com", "test", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO Collectives (title, description, createdAt, updatedAt) VALUES
("collective1", 'A collective for pokemon trainers. All skill levels welcome. Goomy lovers especially!',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('collective2', 'Random artwork collective', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO UserCollectives (role,  createdAt, updatedAt, UserId, CollectiveId) VALUES
("admin", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
("contributor", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1);

INSERT INTO Submissions (title, file, description, type, createdAt, updatedAt, UserId, CollectiveId) VALUES
("bigbooty", "https://cdn.vox-cdn.com/thumbor/1Evq57t9d53K2iHHjc6AkWRSKGA=/0x0:1280x960/1200x800/filters:focal(538x378:742x582)/cdn.vox-cdn.com/uploads/chorus_image/image/57601275/60861120_1280x960.0.0.jpg", "an homage", "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
("penguin", "http://www.animalspot.net/wp-content/uploads/2017/08/Penguin.jpg", "a penguin", "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
("dumb dog", "https://www.thenakedscientists.com/sites/default/files/styles/featured_image/public/media/2007255.jpg?itok=aCwGPSXx", "still smarter than me", "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
("desert", "https://www.desertusa.com/desert-activity/photos/5F3A9074_150422.jpg", "a desert", "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
("piggy", "https://upload.wikimedia.org/wikipedia/en/thumb/2/22/MissPiggy.jpg/220px-MissPiggy.jpg", "miss piggy", "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('A story', NULL, 'Jack and Jill went up the hill...', 'text', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Lost woods', 'https://www.wiizelda.net/mp3/oot/Lost%20Woods.mp3', 'Zelda song!', 'audio', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Zelda', 'https://pre00.deviantart.net/4ad0/th/pre/i/2017/154/a/9/princess_zelda_fanart__logo__by_zephroine-dbbhfnr.png', 'Zelda fanart!', "image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Gif Art', 'https://78.media.tumblr.com/f05a8dcfcd9992fd49a812c970298068/tumblr_nltc47tW3F1rx5rfmo1_640.gif', 'Gif Artwork', 'image', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,2, 1 ),
('Zelda', 'https://i.pinimg.com/736x/80/6e/f3/806ef3f4975d3b71aa2f67b9772c6a7c.jpg', 'Pokemon Trainer', "image",CURRENT_TIMESTAMP,  CURRENT_TIMESTAMP, 2, 1),
('Ganon', 'https://i.chzbgr.com/full/5602291200/hD545D283/', 'Beast ganon fanart', "image",CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Chihiro and Haku', 'https://pre00.deviantart.net/b6ec/th/pre/f/2017/193/2/b/upload_by_ruby__art-dbg1kah.jpg', 'My two favorite characters from spirited away!',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Yoko Kurama', 'https://static.zerochan.net/Youko.Kurama.full.1109726.jpg', 'Fox!',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Mural', 'https://bloximages.newyork1.vip.townnews.com/roanoke.com/content/tncms/assets/v3/editorial/8/72/87240af2-9df3-51e3-85d9-c3cc5f476b21/5b7db14b37fe7.image.jpg?resize=1200%2C900', 'Mystery mural on Salem Avenue',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Table', 'https://www.thisiscolossal.com/wp-content/uploads/2017/05/table-1.jpg', 'Table',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Witch or Lady?', 'https://i.pinimg.com/originals/4f/5b/6f/4f5b6f55d7364f9927ef0677d61b4f8a.jpg', 'This is a famous optical illusion.', "image",CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Moebius House', 'https://i.pinimg.com/originals/c9/a1/b5/c9a1b5d81f79f319799e981131292f3b.jpg', 'Escher M Optical Illusion Art',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Himura Kenshin', 'https://static.zerochan.net/Himura.Kenshin.full.1395466.jpg', 'Kenshin Himura smiling in cherry blossoms',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Ike', 'https://static.zerochan.net/Fire.Emblem%3A.Path.of.Radiance.full.1873283.jpg', 'Ike from fire emblem.',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('MegaMan Legends', 'http://1.bp.blogspot.com/-iBCprvEp4gI/UJCVYq2Q2XI/AAAAAAAAK4o/ztWKgJ0c9d0/s1600/megaman-legends-poster-wallpaper-1.jpg', 'RIP cancelled game',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Shanoa', 'https://t00.deviantart.net/Rns4KCdkbC2Ru-cHGv4emlWfuns=/fit-in/500x250/filters:fixed_height(100,100):origin()/pre00/9b93/th/pre/f/2011/300/7/d/shanoa_by_roguetwo-d4e49gi.jpg', 'Shanoa the heroine of Castlevania: Order of Ecclesia',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Kayn', 'http://www.lol-wallpapers.com/wp-content/uploads/2017/10/Kayn-by-OrekiGenya-HD-Wallpaper-Background-Fan-Art-Artwork-League-of-Legends-lol.jpg', 'Kayn from League of Legends',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 2),
('Miriam', 'https://vignette.wikia.nocookie.net/p__/images/3/38/Miriam_Transparent.png/revision/latest?cb=20150713074952&path-prefix=protagonist', 'The heroine of Bloodstained',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 2),
('Zangetsu', 'https://vignette.wikia.nocookie.net/ritualofthenight/images/2/24/Zangetsu.png/revision/latest?cb=20150830182315', 'Zangetsu, the main hero of Bloodstained',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 2),
('Alucard', 'https://static.zerochan.net/Alucard.%28Castlevania%29.full.1969809.jpg', "Character from Castlevania Symphony of the Night","image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Welcome to the Emerald City!', 'https://i.pinimg.com/236x/34/13/96/34139655f840993c7e8617d96da84d7c--the-wizard-emerald-city.jpg', 'Elphaba about to meet the Wizard!',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Wicked', 'https://i.pinimg.com/236x/18/05/52/18055232ebc46e1161e4da898855d411--broadway-wicked.jpg', 'Fanart!',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Lux PixelArt', 'https://i.imgur.com/ayTbAyd.png', 'Lux from League of Legends pixel-ized',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Modern Painting', 'https://osnatfineart.com/paintings/09-09/09-09-triptych-white-modern-painting.jpg', 'Modern-Art',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Swirly', 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/optical-illusion-beige-swirl-sumit-mehndiratta.jpg', 'swirly-swirly',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 2),
('Hayao Fanart', 'https://78.media.tumblr.com/b1c54fabc2dd23fc036fc56c446caafa/tumblr_nq651vIPOi1r3st5mo1_540.jpg', 'My two favorite movies!',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Howl and Sophie', 'http://images6.fanpop.com/image/photos/32400000/Howl-and-Sophie-howls-moving-castle-32478246-850-1253.jpg', 'Howl and Sophie!',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 2),
('Amaterasu', 'https://pre00.deviantart.net/2bf0/th/pre/f/2011/109/e/4/okami_fanart_by_flywire2-d3ee7b7.jpg', 'Mother of all',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Famous Japanese Wave', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/1200px-Great_Wave_off_Kanagawa2.jpg', 'One of the classics from history',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Zuko', 'https://static.zerochan.net/Zuko.full.719815.jpg', 'Prince Zuko fanart.',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Pizza Art', 'https://imgix.ranker.com/user_node_img/50029/1000566269/original/mona-lisa-pizza-photo-u1?w=650&q=50&fm=jpg&fit=crop&crop=faces', 'Is this even art?',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 1),
('Ghost in the Shell', 'https://i.pinimg.com/originals/8b/ee/f7/8beef71f564218e8a5c41cfa03c3b58e.jpg', 'The Major',"image", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 2, 2);




INSERT INTO Comments (text, createdAt, updatedAt, CollectiveId, UserId, SubmissionId) VALUES
("this collective sucks!", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, null),
("this submission sucks!", CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, null, 1, 1);