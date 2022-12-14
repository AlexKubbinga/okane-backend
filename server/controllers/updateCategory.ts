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
    let output = { data: {}, error: null } as responseType;
    const body = ctx.request.body as updateBody;

    const result = await db.transactions.update(
      { category_id: body.newCategory_id },
      {
        where: {
          user_id_hash: ctx.state.id_hash,
          merchant_id: body.merchant_id,
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
