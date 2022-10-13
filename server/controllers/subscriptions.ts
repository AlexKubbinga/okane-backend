import { summaryScreenMock } from '../models/mocks';
import db from '../models/db';
import Koa from 'koa';

// export const getSubscriptions = (ctx: Koa.Context) => {
// 	try {
// 		ctx.body = summaryScreenMock;
// 		ctx.status = 200;
// 	} catch (err) {
// 		console.log('Error @getSubscriptions:', err);
// 	}
// };

export const getSubscriptions = async (ctx: Koa.Context) => {
	try {
		const allSubs = await db.subscriptions.findAll();
		ctx.body = allSubs;
		ctx.status = 200;
	} catch (err) {
		console.log('Error @getSubscriptions:', err);
	}
};

export const getSubscriptionName = async (ctx: Koa.Context) => {
	try {
		const sub = await db.subscriptions.findOne({ where: {
			code: ctx.params.sub
		}});
		ctx.body = { name: sub.name };
		ctx.status = 200;
	} catch (err) {
		console.log('Error getting subscription name: ', err);
	}
}