import Koa from 'koa';
import { CategoryFactory } from '../models/categories';
import db from '../models/db';

export const getTransactionsByCategory = async (ctx: Koa.Context) => {
  try {
    const result = await db.transactions.findAll({
      where: {
        user_id_hash: '0xiiikkki112234',
      },
      include: [
        {
          model: db.categories,
          required: true,
        },
      ],
    });
    console.log(result);
    ctx.body = result;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getTransactionsByCategory', err);
  }
};
