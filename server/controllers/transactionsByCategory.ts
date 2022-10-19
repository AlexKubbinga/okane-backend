import Koa from 'koa';
import { CategoryFactory } from '../models/categories';
import db from '../models/db';
import { Op } from 'sequelize';
import { firstOfXMonthsAgo } from '../utils/dates';
import sequelize from 'sequelize';

export const getTransactionsByCategory = async (ctx: Koa.Context) => {
  try {
    const result = await db.transactions.findAll({
      where: {
        user_id_hash: ctx.state.id_hash,
        date: {
          [Op.gt]: firstOfXMonthsAgo(1),
        },
      },
      attributes: ['value', 'date'],
      include: [
        {
          model: db.categories,
          attributes: ['name', 'code', 'id'],
          required: true,
        },
        {
          model: db.merchants,
          attributes: ['id', 'code', 'name'],
          required: true,
        },
      ],
    });

    const sumOfCategoryTransactions = await db.transactions
      .findAll({
        where: {
          user_id_hash: ctx.state.id_hash,
          date: {
            [Op.gt]: firstOfXMonthsAgo(1),
          },
        },
        attributes: [[sequelize.fn('sum', sequelize.col('value')), 'value']],
        group: ['category.id', 'name'],
        include: [
          {
            model: db.categories,
            attributes: ['name', 'code', 'id'],

            required: true,
          },
        ],
      })
      .then((output: any) =>
        output.map((category: any) => ({
          category_total: Number(category.value),
          category_name: category.category.name,
          category_code: category.category.code,
          category_id: category.category.id,
        }))
      );

    const transactionsWithCategoryAndMerchant = result.map(
      (trans: {
        value: string;
        date: string;
        category: { name: string; id: number; code: string };
        merchant: { name: string; id: number; code: string };
      }) => {
        return {
          price: Number(trans.value),
          date: trans.date,
          category_name: trans.category.name,
          category_id: trans.category.id,
          category_code: trans.category.code,
          merchant_name: trans.merchant.name,
          merchant_id: trans.merchant.id,
          merchant_code: trans.merchant.code,
        };
      }
    );

    const data = {
      category_totals: sumOfCategoryTransactions,
      transactions: transactionsWithCategoryAndMerchant,
    };

    ctx.body = data;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getTransactionsByCategory', err);
  }
};
