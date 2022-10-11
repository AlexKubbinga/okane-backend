import Koa from 'koa';
import { CategoryFactory } from '../models/categories';
import db from '../models/db';

export const getTransactionsByCategory = async (ctx: Koa.Context) => {
  db.categories.hasMany(db.transactions, {foreignKey: 'category_id'});
	db.transactions.belongsTo(db.categories, {foreignKey: 'category_id'});
  try {
    const result = await db.transactions.findAll({
      where: {
        // NOTE: This relies on the checkToken middleware running first!
        user_id_hash: ctx.state.id_hash,
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
