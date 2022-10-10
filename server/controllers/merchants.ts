import db from '../models/db';
import Koa from 'koa';

export const getMerchants = async (ctx: Koa.Context) => {
	try {
		const allMerchs = await db.merchants.findAll();
		ctx.body = allMerchs;
		ctx.status = 200;
	} catch (err) {
		console.log('Error @getMerchants:', err);
	}
};
