import koaCors from 'koa-cors';
import db from '../models/db';
import Koa from 'koa';

export const getSubscriptionCode = async (ctx: Koa.Context) => {
  try {
    const merchant_id = ctx.params.merchant_id;

    const SubIDResponse = await db.transactions.findOne({
      where: { merchant_id: merchant_id, user_id_hash: ctx.state.id_hash },
      attributes: ['subscription_id'],
    });

    const sub_id = SubIDResponse.dataValues.subscription_id;

    const SubCodeResponse = await db.subscriptions.findOne({
      where: { id: sub_id },
      attributes: ['code'],
    });

    const SubscriptionCode = SubCodeResponse.dataValues.code;

    ctx.body = { subscription_code: SubscriptionCode };
  } catch (e) {
    console.log('ERROR @getSubscriptionCode');
  }
};
