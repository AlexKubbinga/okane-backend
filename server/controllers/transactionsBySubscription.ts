import Koa from 'koa';
import { SubscriptionFactory } from '../models/subscriptions';
import db from '../models/db';
import sequelize from 'sequelize';
import { Op } from 'sequelize';
import { firstOfXMonthsAgo, monthEndDate } from '../utils/dates';

export const getTransactionsBySubscription = async (ctx: Koa.Context) => {
  try {
    const result = await db.transactions.findAll({
      where: {
        user_id_hash: ctx.state.id_hash,
        subscription_id: { [Op.eq]: sequelize.col('subscription.id') },
        date: {
          [Op.gt]: firstOfXMonthsAgo(1),
        },
      },
      attributes: [
        'subscription.id',
        'subscription_id',
        [sequelize.fn('sum', sequelize.col('value')), 'value'],
      ],
      group: ['subscription.id', 'subscription_id', 'name'],
      include: [
        {
          model: db.subscriptions,
          attributes: ['name', 'code'],
          required: true,
        },
      ],
    });
    const subs = result.map((sub: any) => {
      return {
        subscription_id: sub.subscription.code,
        monthlyPrice: Number(sub.value),
        name: sub.subscription.name,
      };
    });
    const output = {
      month: monthEndDate(new Date().toISOString()),
      subs,
    };
    ctx.body = output;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getTransactionsBySubscription', err);
  }
};
