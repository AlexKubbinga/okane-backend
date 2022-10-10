import { summaryScreenMock } from './mocks';
import db from '../models/db';
import Koa from 'koa';

export const getSubscriptions = (ctx: Koa.Context) => {
  try {
    ctx.body = summaryScreenMock;
    ctx.status = 200;
  } catch (err) {
    console.log('Error @getSubscriptions:', err);
  }
};
