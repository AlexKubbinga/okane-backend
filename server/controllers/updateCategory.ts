import Koa from 'koa';
import db from '../models/db';
import { Op } from 'sequelize';
import { firstOfXMonthsAgo } from '../utils/dates';
import { responseType } from '../models/customTypes';

type updateBody = {
  merchant_id: number;
  newCategory_id: number;
};

export const updateCategory = async (ctx: Koa.Context) => {
  try {
    console.log('running Update category');
    let output = { data: {}, error: null } as responseType;
    const { merchant_id, newCategory_id } = ctx.request.body as updateBody;
    console.log(ctx.request.body);

    const result = await db.transactions.update(
      { category_id: newCategory_id },
      {
        where: {
          user_id_hash: ctx.state.id_hash,
          merchant_id: merchant_id,
        },
      }
    );
    if (result[0] !== 1) {
      // failed to update
      output.error = true;
      output.data = null;
    } else {
      output.data = 'category successfully changed';
    }

    ctx.body = output;
  } catch (e) {
    console.log('Error in updating Categories');
  }
};
