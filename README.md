# Okané Backend

This is the backend for Okané, which is a spending tracker that leverages Open Banking to allow individuals to get personalized insights into how they spend their money.

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
 
 Hello
