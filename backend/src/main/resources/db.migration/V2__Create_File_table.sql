
--  create table for filesUploaded upload

create table filesUploaded (
    id serial primary key,
    file_name varchar(255) not null,
    file_type varchar(255) not null,
    file_data bytea not null
);