import Koa from 'koa';
import { CategoryFactory } from '../models/categories';
import db from '../models/db';

export const getTransactionsByCategory = async (ctx: Koa.Context) => {
  try {
    const result = await db.transactions.findAll({
      where: {
        user_id_hash: '0xiiikkki112234',
        date: db.sequelize.fn('DATE', '2022-09-30'),
      },
      include: [
        {
          model: db.categories,
          required: true,
        },
      ],
    });
    console.log(typeof result[0].date);
    ctx.body = result;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getTransactionsByCategory', err);
  }
};
