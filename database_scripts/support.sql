create table support_tickets
(
    TicketID int auto_increment
        primary key,
    reporter text not null,
    assignee text null,
    problem  text null,
    solution text null,
    state    text null
);