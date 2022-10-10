import Koa from 'koa';
import db from '../models/db';

export const getTransactions = async (ctx: Koa.Context) => {
	try {
		const result = db.transactions.findAll();
		ctx.body = result;
		ctx.status = 200;
	} catch (err) {
		console.log('Err @getTransactions', err);
	}
};
