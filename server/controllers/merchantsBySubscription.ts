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
          [Op.gt]: firstOfXMonthsAgo(12),
        },
      },
      attributes: [
        'month_end_date',
        'merchant.id',
        'subscription.id',
        [db.sequelize.fn('sum', db.sequelize.col('value')), 'value'],
      ],
      group: [
        'merchant.id',
        'subscription.id',
        'month_end_date',
        'merchant.name',
        'merchant.short_name',
      ],
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

    interface MerchantBySubscriptionType {
      month_end_date: string;
      merchant: { name: string; short_name: string };
      value: number;
    }

    interface ArrayMerchantRecordType {
      [key: string]: number;
    }

    interface MerchantBySubscriptionOutputType {
      [key: string]: number | string;
    }

    const months: any = {};

    result.forEach((element: MerchantBySubscriptionType) => {
      if (!months[element.month_end_date]) {
        months[element.month_end_date] = [] as ArrayMerchantRecordType[];
      }
      const merchObj: ArrayMerchantRecordType = {
        [element.merchant.short_name]: element.value,
      };
      months[element.month_end_date].push(merchObj);
    });

    const def: {}[] = [];
    for (let month in months) {
      const completeMonthObj: MerchantBySubscriptionOutputType = {
        monthEndDate: month,
      };
      for (let merch of months[month]) {
        const key = Object.keys(merch)[0];
        completeMonthObj[key] = merch[key];
      }
      def.push(completeMonthObj);
    }

    ctx.body = def;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getMerchantsBySubscription', err);
    ctx.status = 400;
  }
};
