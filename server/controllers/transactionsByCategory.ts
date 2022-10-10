import Koa from 'koa';
import { CategoryFactory } from '../models/categories';
import db from '../models/db';

export const getTransactionsByCategory = async (ctx: Koa.Context) => {
	db.categories.hasMany(db.transactions);
	db.transactions.belongsTo(db.categories);

	try {
		const result = await db.transactions.findAll({
			include: [
				{
					model: CategoryFactory,
					required: true,
				},
			],
		});
		ctx.body = result;
		ctx.status = 200;
	} catch (err) {
		console.log('Err @getTransactionsByCategory', err);
	}
};
