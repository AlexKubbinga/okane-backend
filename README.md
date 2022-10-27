# Okané Backend

This is the backend for Okané, which is a spending tracker that leverages Open Banking to allow individuals to get personalized insights into how they spend their money.
This is the backend for the world's best spending tracker.

The server is made using Koa and is connected to a Postgres Database through the ORM Sequelize.

The database uses a Dimensional model to allow for referential integrity and performant data access.

An integration to Tink, an open banking platform, is used to gain consentual access to user's transaction data. This data is then cleaned and transformed so that it can be loaded into the database.

We are in the process of getting approved to the Open Banking Implementation Entity (OBIE) Directory so that we can become a registered TPP and connect with banks and other account providers.


### Front-end
The front-end repository can be found using [this link.](https://github.com/flowerco/okane)

### Contributors

- Sam Flower
- Ben Stimpson
- Simon Roope
- Alex Kubbinga
### Installation Instructions:

1. Run the `okane_postgres_data.sql` and the `okane_postgres_tables.sql` following instructions in the data folder.

- This will create the DB with the Table Schema and populate the mock data.

2. Run `npm run start` to launch the server.

3. Fork the `okane` repo to get access to the front-end.

From,

Mr. Money
