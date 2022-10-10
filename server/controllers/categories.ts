import db from '../models/db';
import Koa from 'koa';

export const getCategories = async (ctx: Koa.Context) => {
	try {
		const allCats = await db.categories.findAll();
		ctx.body = allCats;
		ctx.status = 200;
	} catch (err) {
		console.log('Error @getCategories:', err);
	}
};
