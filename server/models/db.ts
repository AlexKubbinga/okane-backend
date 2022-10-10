const Sequelize = require('sequelize');
import fs from 'fs';
import path from 'path';
import { UserFactory } from './users';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const PORT = process.env.DB_PORT;
const USER = process.env.DB_USER;

const sequelize = new Sequelize(`postgres://${USER}localhost:${PORT}/okane`);

interface DbModel {
  [key: string]: any;
}

const db: DbModel = {
  sequelize,
  Sequelize,
  user: UserFactory(sequelize, Sequelize),
};

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

//db wrapper

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
