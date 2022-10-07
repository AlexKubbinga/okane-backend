const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://ben@localhost:5432/okane');

export const test = async () => {
	try {
		await sequelize.authenticate();
		console.log('DB Connection is successful.');
	} catch (err) {
		console.log('DB connection failed', err);
	}
};

//db wrapper
export const db = {
	sequelize,
	Sequelize,
};
