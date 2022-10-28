Create tables and Data in Postgres database using postgres cli - psql
In database run two scripts; to create tables and populate tables

Run this command to connect to the DB on Postgres:
psql -p5432 "{INSERT DB NAME}"

\*Your-Local-Dir\* is where your local repo is located
Run the two following commands on psql:

\i \*Your-Local-Dir\*/okane-backend/data/okane_postgres_tables.sql

\i \*Your-Local-Dir\*/okane-backend/data/okane_postgres_data.sql
