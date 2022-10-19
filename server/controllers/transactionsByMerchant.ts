import Koa from 'koa';
import db from '../models/db';
import { Op } from 'sequelize';
import { firstOfXMonthsAgo } from '../utils/dates';

export const getTransactionsByMerchant = async (ctx: Koa.Context) => {
  try {
    const result = await db.transactions.findAll({
      where: {
        user_id_hash: ctx.state.id_hash,
        date: {
          [Op.gt]: firstOfXMonthsAgo(12),
        },
      },
      attributes: [
        'month_end_date',
        'date',
        'merchant.id',
        'subscription.id',
        'value',
      ],
      include: [
        {
          model: db.subscriptions,
          attributes: ['code','name'],
          required: true,
        },
        {
          model: db.merchants,
          attributes: ['name'],
          required: true,
        },
      ],
    });

    const trans = result.map((tran: any) => {
      return {
        month_end_date: tran.month_end_date,
        date: tran.date,
        subscription_code: tran.subscription.code,
        subscription_name: tran.subscription.name,
        merchant_name: tran.merchant.name,
        price: Number(tran.value),
      };
    });

    const output = trans;

    ctx.body = output;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getTransactionsByMerchant', err);
    ctx.status = 400;
  }
};
