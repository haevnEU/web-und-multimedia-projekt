create table player
(
    USER_ID    int auto_increment
        primary key,
    first_name varchar(30) not null,
    surname    varchar(30) not null,
    email      varchar(30) not null,
    state      int         not null,
    motto      varchar(30) not null,
    gametag    varchar(16) not null,
    score      int         not null,
    pass       text        not null,
    salt       varchar(60) not null
);

INSERT INTO game.player (USER_ID, first_name, surname, email, state, motto, gametag, score, pass, salt) VALUES (1, 'system', 'system', 'system@tetris.de', 0, '', 'system#0000', 0, '$2y$10$SeelIONK61cgeluZMsAToeBYLAgyQLSRfU2bXH7HXbP4LxEYarEES', '');
INSERT INTO game.player (USER_ID, first_name, surname, email, state, motto, gametag, score, pass, salt) VALUES (2, 'admin', 'admin', 'admin@tetris.de', 0, '', 'admin#0000', 0, '$2y$10$5S/MGAfPO4SgMaclvwKl0Oj5ylv4PgK6Bl5WPgvePOsXHOWKIEpO6', '');
INSERT INTO game.player (USER_ID, first_name, surname, email, state, motto, gametag, score, pass, salt) VALUES (3, 'gamemaster', 'gamemaster', 'gamemaster@tetris.de', 0, '', 'gamemaster#0000', 0, '$2y$10$oRDDNVBvNtSg/VfcK6hSQuA1tDTqUJAA418RlWJhGI1h.Q5cio40W', '');