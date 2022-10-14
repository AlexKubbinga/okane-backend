import Koa from 'koa';
import db from '../models/db';
import { Op } from 'sequelize';
import { firstOfXMonthsAgo } from '../utils/dates';
import {
  ArrayMerchantRecordType,
  MerchantBySubscriptionOutputType,
  MerchantBySubscriptionType,
} from '../models/customTypes';

export const getMerchantsBySubscription = async (ctx: Koa.Context) => {
  try {
    console.log('PARAMS', ctx.params);
    const result = await db.transactions.findAll({
      where: {
        user_id_hash: ctx.state.id_hash,
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
          where: { code: [ctx.params.sub] },
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

    const def: MerchantBySubscriptionOutputType[] = [];
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

    // Intentionally break the list by removing one month of disney.
    // const aprilData = def[3];
    // delete aprilData["disney"];

    // In case of missing values for some months, we populate all subscriptions for all months, but add
    // zero values where the subscription was not populated.
    const subscriptionList = new Set<string>();
    for (let month of def) {
      for (let key in month) {
        if (key !== 'monthEndDate') subscriptionList.add(key);
      }
    }

    for (let month of def) {
      for (let setSub of subscriptionList) {
        if (!Object.keys(month).includes(setSub)) {
          month[setSub] = '0';
        }
      }
    }

    ctx.body = def;
    ctx.status = 200;
  } catch (err) {
    console.log('Err @getMerchantsBySubscription', err);
    ctx.status = 400;
  }
};
