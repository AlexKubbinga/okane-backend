const Sequelize = require('sequelize');
import fs from 'fs';
import path from 'path';
import { UserFactory } from './users';
const sequelize = new Sequelize('postgres://ben@localhost:5432/okane');

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
