import Koa from 'koa';
import { CategoryFactory } from '../models/categories';
import db from '../models/db';
import { Op } from 'sequelize';
import { firstOfXMonthsAgo } from '../utils/dates';

export const getTransactionsByCategory = async (ctx: Koa.Context) => {
  try {
    const result = await db.transactions.findAll({
      where: {
        user_id_hash: '0xiiikkki112233',
        date: {
          [Op.gt]: firstOfXMonthsAgo(1),
        },
      },
      attributes: ['value'],
      include: [
        {
          model: db.categories,
          attributes: ['name', 'code', 'id'],
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
