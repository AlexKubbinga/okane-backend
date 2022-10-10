import Koa from 'koa';
import { SubscriptionFactory } from '../models/subscriptions';
import db from '../models/db';

export const getTransactionsBySubscription = async (ctx: Koa.Context) => {
	db.subscriptions.hasMany(db.transactions);
	db.transactions.belongsTo(db.subscriptions);

	try {
		const result = await db.transactions.findAll({
			include: [
				{
					include: SubscriptionFactory,
					required: true,
				},
			],
		});
		ctx.body = result;
		ctx.status = 200;
	} catch (err) {
		console.log('Err @getTransactionsBySubscription', err);
	}
};
