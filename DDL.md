Working 'create user' table

CREATE TABLE users (
id SERIAL PRIMARY KEY,
id_hash character varying(255) NOT NULL,
name character varying(255) NOT NULL,
"createdAt" timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp
);
