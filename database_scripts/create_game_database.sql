CREATE DATABASE game;
USE game;

CREATE OR REPLACE TABLE friendlist(
    USER_ID int not null primary key,
    FRIEND_ID text null
);

CREATE OR REPLACE TABLE player(
    USER_ID int auto_increment primary key,
    first_name varchar(30) not null,
    surname varchar(30) not null,
    email varchar(30) not null,
    state int not null,
    gametag varchar(20) not null,
    score int not null,
    pass text not null,
    salt varchar(60) not null,
    style varchar(30) default 'darkmode' null,
    account_type int default 0 null,
    telephone varchar(30) default '' null,
    account_suspended tinyint(1) default 0 null,
    secret varchar(30) null
);

CREATE OR REPLACE TABLE scoreboard(
    ID int auto_increment primary key,
    gametag varchar(30) not null,
    score int not null,
    date datetime default curdate() null
);

CREATE OR REPLACE TABLE support_tickets(
    TicketID int auto_increment primary key,
    reporter text not null,
    assignee text null,
    problem text null,
    solution text null,
    state text null
);


INSERT INTO player (first_name, surname, email, state, gametag, score, pass, salt, style, account_type, telephone, account_suspended, secret) VALUES ('system', 'system', 'system@tetris.de', 0, 'SYSTEM#0000', 0, '$2y$10$TYdhiAWE85tE3L9p74nwIeo3rybtGWX5xoGTilXXLXSbBQWyWUyWS', '', 'darkmode', 15, '', 0, 'I62B5QLSCRCZBZY5');
INSERT INTO player (first_name, surname, email, state, gametag, score, pass, salt, style, account_type, telephone, account_suspended, secret) VALUES ('admin', 'admin', 'admin@tetris.de', 0, 'ADMIN#0000', 0, '$2y$10$UpkOILyyR39cfL/HNBBHvO1yy/WLfTnQxWomNbCDX1uPNqDH.AgwK', '', 'darkmode', 7, '', 0, 'I62B5QLSCRCZBZY5');
INSERT INTO player (first_name, surname, email, state, gametag, score, pass, salt, style, account_type, telephone, account_suspended, secret) VALUES ('gamemaster', 'gamemaster', 'gamemaster@tetris.de', 0, 'GAMEMASTER#0000', 0, '$2y$10$pBZ1xqPnymypWeV9rEFzEO037evLbYaCb/TUem5FI9xp1OAxbngbS', '', 'darkmode', 3, '', 0, 'I62B5QLSCRCZBZY5');
