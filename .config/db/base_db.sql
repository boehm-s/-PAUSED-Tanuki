BEGIN TRANSACTION;
CREATE TABLE "users" (
	`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`lastname`	varchar(100) NOT NULL,
	`firstname`	varchar(100) NOT NULL,
	`email`	varchar(100) NOT NULL,
	`password`	varchar(40) NOT NULL,
	`role`	INTEGER NOT NULL,
	`birthdate`	INTEGER NOT NULL
);
INSERT INTO `users` VALUES(1,'Finch','Brooke','brooke.finch@mail.fr','9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684','normal',1494010957);
INSERT INTO `users` VALUES(2,'Cantrell','Victoria','victoria.cantrell@mail.fr','9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684','normal',1494010957);
INSERT INTO `users` VALUES(3,'Spence','Trevor','trevor.spence@mail.fr','9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684','normal',1494010957);
INSERT INTO `users` VALUES(4,'Combs','Callum','callum.combs@mail.fr','9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684','normal',1494010957);
INSERT INTO `users` VALUES(5,'Walker','Kyla','kyla.walker@mail.fr','9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684','admin',1494010957);
INSERT INTO `users` VALUES(6,'Henry','Walker','walker.henry@mail.fr','9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684','normal',1494010957);
INSERT INTO `users` VALUES(7,'Madden','Kristen','kristen.madden@mail.fr','9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684','normal',1494010957);
INSERT INTO `users` VALUES(8,'Tucker','Guy','guy.tucker@mail.fr','9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684','normal',1494010957);
INSERT INTO `users` VALUES(9,'Ratliff','Kevin','kevin.ratliff@mail.fr','9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684','admin',1494010957);
INSERT INTO `users` VALUES(10,'Le Querec','Robin','robin.lequerec@etna-alternance.net','9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684','admin',1494010957);
COMMIT;
