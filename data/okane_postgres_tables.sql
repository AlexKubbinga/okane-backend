/*
 Simon Roope 9/10/2022
 Create Okane Postgres tables
 /Applications/Postgres.app/Contents/Versions/14/bin/psql -p5432 "simonroope" -f --echo-all okane_postgres_tables.sql
  ~/Documents/scr/codeworks/thesis/data/ 
 psql -p5432 "simonroope"
 -f okane_postgres_tables.sql
*/


\echo 'DROP TABLES'
drop table if exists transactions;
drop table if exists merchants;
drop table if exists subscriptions;
drop table if exists categories;
drop table if exists users;


\echo 'CREATE TABLES'
create table users ( id SERIAL PRIMARY KEY, id_hash varchar(255) not null, password varchar(255) not null, email varchar(255) not null, name varchar(255) not null, "createdAt" timestamp not null default CURRENT_TIMESTAMP, "updatedAt" timestamp );

create table categories ( id SERIAL PRIMARY KEY, code varchar(255) not null, name varchar(255) not null, "createdAt" timestamp not null default CURRENT_TIMESTAMP, "updatedAt" timestamp );

create table subscriptions ( id SERIAL PRIMARY KEY, code varchar(255) not null, name varchar(255) not null, "createdAt" timestamp not null default CURRENT_TIMESTAMP, "updatedAt" timestamp );

create table merchants ( id SERIAL PRIMARY KEY, code varchar(255) not null, name varchar(255) not null, short_name varchar(255) not null, "createdAt" timestamp not null default CURRENT_TIMESTAMP, "updatedAt" timestamp );

create table transactions ( 
    id SERIAL PRIMARY KEY,
    date timestamp not null,
    month_end_date timestamp not null,
    ccy varchar(255) not null,
    user_id smallint not null references users(id),
    user_id_hash varchar(255) not null,
    merchant_id smallint not null references merchants(id), 
    subscription_id smallint not null references subscriptions(id),
    category_id smallint not null references categories(id),
    value decimal,
    value_ytd decimal,
    value_ly decimal,
    "createdAt" timestamp not null default CURRENT_TIMESTAMP, "updatedAt" timestamp
);

\echo 'CREATE TABLES SUCCESS'