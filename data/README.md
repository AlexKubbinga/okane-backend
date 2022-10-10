// Simon Roope 10/10/2022 \
// Create tables and Data in Postgres database using postgres cli - psql \
// In database run two scripts; to create tables and populate tables \
// Need to define <Your-Local-Dir> \

\i ~/Documents/scr/codeworks/thesis/okane-backend/data/okane_postgres_tables.sql 

\i ~/Documents/scr/codeworks/thesis/okane-backend/data/okane_postgres_data.sql

// EXAMPLE

Last login: Mon Oct 10 09:12:26 on ttys003
/Applications/Postgres.app/Contents/Versions/14/bin/psql -p5432 "simonroope"

 ~/ /Applications/Postgres.app/Contents/Versions/14/bin/psql -p5432 "simonroope"

psql (14.5)

Type "help" for help.

simonroope-# \i <Your-Local-Dir>/okane-backend/data/okane_postgres_tables.sql

simonroope-# \i <Your-Local-Dir>/okane-backend/data/okane_postgres_data.sql
