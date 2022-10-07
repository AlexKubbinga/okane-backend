import { db } from '../models/db';

export const postUserData = (ctx: any) => {
	try {
		const data = ctx.request.body;
		db.sequelize.create(data);
		ctx.status = 201;
	} catch (err) {
		console.log('Post Data Request:', err);
	}
};

export const getUserData = (ctx: any) => {
	try {
		db.sequelize.findAll();
		ctx.status = 200;
	} catch (err) {
		console.log('Get User Request:', err);
	}
};
