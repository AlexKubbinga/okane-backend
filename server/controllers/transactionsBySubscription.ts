import Koa from 'koa';
import { SubscriptionFactory } from '../models/subscriptions';
import db from '../models/db';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { firstOfXMonthsAgo } from '../utils/dates';

export const getTransactionsBySubscription = async (ctx: Koa.Context) => {
  try {
    console.log();

    const result = await db.transactions.findAll({
      where: {
        user_id_hash: '0xiiikkki112233',
        date: {
          [Op.gt]: firstOfXMonthsAgo(1),
        },
      },
      attributes: [
        'date',
        'ccy',
        'subscription_id',
        [sequelize.fn('sum', sequelize.col('value')), 'value'],
      ],
      group: ['subscription_id', 'date', 'ccy', 'subscription.id', 'name'],
      include: [
        {
          model: db.subscriptions,
          attributes: ['name'],
          required: true,
        },
      ],
    });
    const output = { date: result.date, name: result.subscription.name };
    // console.log(typeof result[0].date, result[0].date);s
    ctx.body = output;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getTransactionsBySubscription', err);
  }
};
