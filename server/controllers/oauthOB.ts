import Koa from 'koa';
import { literal } from 'sequelize';
import db from '../models/db';
import { firstOfXMonthsAgo, monthEndDate, scaleValue } from '../utils/dates';
import {
  findOrCreateMerchant_id,
  findOrCreateUnknownSub,
  findOrCreateUnknownCat,
  getAccessCode,
  getUserID,
  getTransactionsFromOB,
} from './OBDataInputFunctions';

// import fetch from 'node-fetch';

type auth = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

export const tinkOAuth = async (ctx: Koa.Context) => {
  console.log(ctx.query);
  const code = ctx.query.code as string;
  const client_id = process.env.TINK_CLIENT_ID;
  const client_secret = process.env.TINK_SECRET;

  const verificationOutput = await getAccessCode(
    code,
    client_id,
    client_secret
  );

  const { access_token, expires_in, refresh_token } = verificationOutput;

  const transactions = await getTransactionsFromOB(access_token);

  const user_id = await getUserID(ctx.state.id_hash);

  // To add to DB incase doesn't exist on someone's local DB
  const [UnknownSub, createdS] = await findOrCreateUnknownSub();

  const [UnknownCat, createdC] = await findOrCreateUnknownCat();

  for (let entry of transactions.transactions) {
    const merchant = entry.descriptions.display;
    const value = scaleValue(
      entry.amount.value.unscaledValue,
      entry.amount.value.scale
    );
    const positive_value = value * -1;
    const dateTrans = new Date(entry.dates.booked);
    const month_end_date = monthEndDate(entry.dates.booked);
    const ccy = entry.amount.currencyCode;

    const merchant_id = await findOrCreateMerchant_id(merchant, value);
    if (merchant_id === null) continue;

    const subAndCatIDs = await db.transactions.findOne({
      where: { merchant_id: merchant_id },
      attributes: ['subscription_id', 'category_id'],
    });

    let category_id;
    let subscription_id;

    if (subAndCatIDs === null) {
      category_id = UnknownCat.dataValues.id;
      subscription_id = UnknownSub.dataValues.id;
    } else {
      subscription_id = subAndCatIDs.dataValues.subscription_id;
      category_id = subAndCatIDs.dataValues.category_id;
    }

    const created = await db.transactions.create({
      date: dateTrans,
      month_end_date: month_end_date,
      ccy: ccy,
      user_id: user_id,
      user_id_hash: ctx.state.id_hash,
      merchant_id: merchant_id,
      subscription_id: subscription_id,
      category_id: category_id,
      value: positive_value,
    });
  }

  ctx.redirect('http://localhost:3000/');
};
