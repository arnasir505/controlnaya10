create schema `news-db` collate utf8mb4_general_ci;
use `news-db`;
create table news
(
    id    int auto_increment,
    title VARCHAR(50)  not null,
    body  TEXT         not null,
    image VARCHAR(100) null,
    date  VARCHAR(50)  not null,
    constraint news_pk
        primary key (id)
)
    auto_increment = 101;
create table comments
(
    id      int auto_increment,
    news_id int         not null,
    author  VARCHAR(50) null,
    body    TEXT        not null,
    constraint comments_pk
        primary key (id),
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
)
    auto_increment = 201;
alter table comments
    drop foreign key comments_news_id_fk;

alter table comments
    add constraint comments_news_id_fk
        foreign key (news_id) references news (id)
            on delete cascade;