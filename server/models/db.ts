const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://user:ben:5432/okane');

try {
	await sequelize.authenticate();
	console.log('DB Connection is successful. ');
} catch (err) {
	console.log('DB connection failed', err);
}

export default sequelize;
