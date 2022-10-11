import db from './db';

// Merchants
// Users
// Subscriptions
// Categories
// Transactions

db.categories.hasMany(db.transactions);
db.transactions.belongsTo(db.categories);

db.users.hasMany(db.transactions);
db.transactions.belongsTo(db.users);

db.subscriptions.hasMany(db.transactions);
db.transactions.belongsTo(db.subscriptions);

db.merchants.hasMany(db.transactions);
db.transactions.belongsTo(db.merchants);
