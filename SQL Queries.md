Working, but note some alterations. Finalised syntax in DDL/DML files.

CREATE TABLE "Expenditures" (
id SERIAL PRIMARY KEY,
name VARCHAR(250)
);
CREATE UNIQUE INDEX "Expenditures_pkey" ON "Expenditures"(id int4_ops);

insert into "Expenditures" ( id, name ) values ( nextval('seq_expenditures'), 'Fitness' );

CREATE TABLE "Users" (
id SERIAL PRIMARY KEY,
name VARCHAR(250),
name_hash VARCHAR(250),
);

create sequence seq_users start 1

insert into "User" ( id, name, name_hash ) values ( nextval('seq_users'), 'Simon', '1234ABC' );

ALTER TABLE "public"."users" ALTER COLUMN "id" SET DEFAULT nextval('seq_users');

CREATE TABLE users (
id integer DEFAULT nextval(‘seq_users’::regclass) NOT NULL PRIMARY KEY,
id_hash character varying(255) NOT NULL,
name character varying(255) NOT NULL,
"createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp
);

CREATE TABLE users (
id SERIAL PRIMARY KEY,
id_hash character varying(255) NOT NULL,
name character varying(255) NOT NULL,
"createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp
);
