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

