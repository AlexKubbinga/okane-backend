import Koa from 'koa';
import db from '../models/db';
import { Op } from 'sequelize';
import { firstOfXMonthsAgo } from '../utils/dates';

export const getMerchantsBySubscription = async (ctx: Koa.Context) => {
  try {

    const result = await db.transactions.findAll({
      where: {
        user_id_hash: '0xiiikkki112233',
        date: {
          [Op.gt]: firstOfXMonthsAgo(1),
        },
      },
      attributes: [
        'month_end_date',
        'merchant.id',
        'subscription.id',
        [db.sequelize.fn('sum', db.sequelize.col('value')), 'value'],
      ],
      group: ['merchant.id', 'subscription.id', 'month_end_date', 'merchant.name', 'merchant.short_name'],
      include: [
        {
          model: db.merchants,
          attributes: ['name', 'short_name'],
          required: true,
        }, 
        {
          model: db.subscriptions,
          attributes: [],
          where: { code: ctx.params.sub }, 
          required: true,
        },         
      ],
    });

    const merchs = result.map((merch: any) => {
      console.log('merchId ', merch.merchant)
      return {
        name: merch.merchant.short_name,
        monthlyPrice: Number(merch.value),
      };
    });

    const output = { month: result[0].month_end_date, merchs };

    ctx.body = output;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getMerchantsBySubscription', err);
    ctx.status = 400;
  }
};