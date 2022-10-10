const Sequelize = require('sequelize');

import { UserFactory } from './users';
import { SubscriptionFactory } from './subscriptions';
import { CategoryFactory } from './categories';
import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const PORT = process.env.DB_PORT;
const USER = process.env.DB_USER;
const HOST = process.env.DB_HOST;
const NAME = process.env.DB_NAME;

const sequelize = new Sequelize(`postgres://${USER}${HOST}:${PORT}/${NAME}`);
interface DbModel {
	[key: string]: any;
}

const db: DbModel = {
	sequelize,
	Sequelize,
	users: UserFactory(sequelize, Sequelize),
	subscriptions: SubscriptionFactory(sequelize, Sequelize),
	categories: CategoryFactory(sequelize, Sequelize),
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
