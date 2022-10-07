const userDataModel = require('../models/index.ts');

export const postUserData = (ctx) => {
	try {
		const data = ctx.request.body;
		userDataModel.insertIntoDb(data);
		ctx.status = 201;
	} catch (err) {
		console.log('Controller Post', err);
	}
};
