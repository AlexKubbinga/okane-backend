import Koa from 'koa';
import { SubscriptionFactory } from '../models/subscriptions';
import db from '../models/db';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { sub } from 'date-fns';

export const getTransactionsBySubscription = async (ctx: Koa.Context) => {
  try {
    const today = new Date();

    const result = await db.transactions.findAll({
      where: {
        user_id_hash: '0xiiikkki112233',
        date: {
          [Op.gt]: [Date.now()],
        },
      },
      attributes: ['date', 'ccy', 'subscription_id', 'value'],
      include: [
        {
          model: db.subscriptions,
          attributes: ['name'],
          required: true,
        },
      ],
    });
    console.log(typeof result[0].date, result[0].date);
    ctx.body = result;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getTransactionsBySubscription', err);
  }
};
