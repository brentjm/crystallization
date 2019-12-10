begin;
create table infrared
(
    timestamp bigint primary key,
    equipment character varying(40),
    command character varying(40),
    absorption real[] not null
);
create table fbrm
(
    timestamp bigint primary key,
    equipment character varying(40),
    command character varying(40),
    histogram real[] not null
);
commit;
