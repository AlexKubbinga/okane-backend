const Sequelize = require('sequelize');
import { DataTypes } from 'sequelize';
import { UserFactory } from './users';
import { CategoryFactory } from './categories';
import { SubscriptionFactory } from './subscriptions';
import { MerchantFactory } from './merchants';
import { TransactionFactory } from './transactions';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// const PORT = process.env.DB_PORT;
// const USER = process.env.DB_USER;
// const HOST = process.env.DB_HOST;
// const NAME = process.env.DB_NAME;

// const sequelize = new Sequelize(`postgres://${USER}${HOST}:${PORT}/${NAME}`, {
//   timestamps: false,
//   logging: false,
// });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  timestamp: false
});

interface DbModel {
  [key: string]: any;
}

const db: DbModel = {
  sequelize,
  Sequelize,
  users: UserFactory(sequelize, DataTypes),
  categories: CategoryFactory(sequelize, DataTypes),
  subscriptions: SubscriptionFactory(sequelize, DataTypes),
  merchants: MerchantFactory(sequelize, DataTypes),
  transactions: TransactionFactory(sequelize, DataTypes),
};

db.subscriptions.hasMany(db.transactions, {
  foreignKey: 'subscription_id',
});
db.transactions.belongsTo(db.subscriptions, {
  foreignKey: 'subscription_id',
});

db.categories.hasMany(db.transactions, {
  foreignKey: 'category_id',
});
db.transactions.belongsTo(db.categories, { foreignKey: 'category_id' });

db.users.hasMany(db.transactions, {
  foreignKey: 'user_id',
});
db.transactions.belongsTo(db.users, {
  foreignKey: 'user_id',
});

db.merchants.hasMany(db.transactions, {
  foreignKey: 'merchant_id',
});
db.transactions.belongsTo(db.merchants, {
  foreignKey: 'merchant_id',
});

export const test = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB Connection is successful.');
  } catch (err) {
    console.log('DB connection failed', err);
  }
};

Object.keys(db).forEach((modelName: string) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
