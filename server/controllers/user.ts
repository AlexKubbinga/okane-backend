import db from '../models/db';
import Koa from 'koa';

export const postUserData = (ctx: Koa.Context) => {
  try {
    const data = ctx.request.body;
    db.user.create(data);
    ctx.status = 201;
  } catch (err) {
    console.log('Post Data Request:', err);
  }
};

export const getUserData = async (ctx: Koa.Context) => {
  try {
    const allUsers = await db.user.findAll();
    ctx.body = allUsers;
    ctx.status = 200;
  } catch (err) {
    console.log('Get User Request:', err);
  }
};
