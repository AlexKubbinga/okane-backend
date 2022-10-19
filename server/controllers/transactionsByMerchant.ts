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
          attributes: ['name'],
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
        monthEndDate: tran.month_end_date,
        date: tran.date,
        subName: tran.subscription.name,
        merchName: tran.merchant.name,
        dailyPrice: Number(tran.value),
      };
    });

    //  TODO : reduce to reformat

    //   const categoryPosts = posts.reduce((acc, post) => {
    //     let {id, category} = post;
    //     return {...acc, [category]: [...(acc[category] || []), id]};
    // }, {});

    const months = trans.reduce((acc: any, mon: any) => {
      let { date, subName, merchName, dailyPrice, monthEndDate } = mon;
      return { ...acc, [monthEndDate]: [...(acc[monthEndDate] || []), date] };
    }, {});

    //const output = { month: result[0].month_end_date, trans };
    const output = trans;

    ctx.body = output;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getTransactionsByMerchant', err);
    ctx.status = 400;
  }
};
