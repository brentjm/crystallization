begin;
create table infrared
(
    timestamp bigint primary key,
    username character varying(40),
    experiment character varying(40),
    absorption real[] not null
);
commit;
