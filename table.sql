USE bs;
CREATE TABLE `test` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL DEFAULT '',
  `password` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(128) UNIQUE NOT NULL DEFAULT '',
  `phone` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `device` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) UNIQUE NOT NULL DEFAULT '',
  `description` varchar(256),
  `userid` int(11) NOT NULL DEFAULT 0,
  `kind` int NOT NULL DEFAULT 1,
  `activate` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `message` (
    `device` varchar(128) NOT NULL,
    `alert` int NOT NULL DEFAULT 0,
    `info` varchar(128) NOT NULL DEFAULT '',
    `lat` numeric(18, 15) NOT NULL DEFAULT 0,
    `lng` numeric(18, 15) NOT NULL DEFAULT 0,
    `stamp` varchar(128) NOT NULL DEFAULT '',
    `value` int NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `user` VALUES(null, 'zyc', '123456', '740969824@qq.com', '10086');
INSERT INTO `device` VALUES(null, 'device0001', 'test', '1', '1');
INSERT INTO `message` VALUES('device0001', 0, 'test', 30.41520917415619, 120.29645810127259, '1617586090511', 100);
INSERT INTO `device` VALUES(null, 'device0002', 'test', '1', '2');
INSERT INTO `device` VALUES(null, 'device0003', 'test', '1', '1');