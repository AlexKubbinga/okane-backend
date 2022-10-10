import { Request, Response, NextFunction, Router } from 'express';
import { CookieType } from '../models/customTypes';
import bcrypt from 'bcrypt';
import { createSession, expireSession } from '../session/stateless';
import jwt_decode from 'jwt-decode';
import db from '../models/db';
import Koa from 'koa';

// //REGISTER

export type BodyRegister = {
  email: string;
  password: string;
  id_hash: string;
  name: string;
};
export const register = async (ctx: Koa.Context) => {
  console.log('Calling the register controller');
  try {
    const body = ctx.request.body as BodyRegister;
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    //create new user
    const newUser = await db.users.create({
      id_hash: body.id_hash,
      name: body.name,
      email: body.email,
      password: hashedPassword,
    });

    console.log('New User created: ', newUser);
    ctx.status = 200;
    ctx.body = newUser;
  } catch (error) {
    // console.log(error)
    ctx.status = 500;
  }
};

export type BodyLogin = {
  email: string;
  password: string;
};
// //LOGIN
export const login = async (ctx: Koa.Context) => {
  try {
    const body = ctx.request.body as BodyLogin;
    console.log('Body from request: ', body);
    const user = await db.users.findOne({
      where: { email: body?.email }
    });
    if (!user) {
      ctx.status = 404;
      ctx.body = 'User Not Found';
      return;
    }
    console.log('User found on db: ', user);

    const validPassword = await bcrypt.compare(body.password, user.password);

    if (!validPassword) {
      ctx.status = 400;
      ctx.body = 'wrong password';
      return;
    }

    const sessionJwt = createSession(user.id_hash);
    console.log('New session JWT created: ', sessionJwt);
    // TODO: Update the cookie options here to make them more secure
    ctx.cookies.set('sessionJwt', sessionJwt);
    ctx.body = sessionJwt;
    ctx.status = 200;
  } catch (error) {
    // console.log(error)
    ctx.status = 500;
    ctx.body = 'Error with cookie-creation';
  }
};

// VERIFY
const validateJwt = (cookie: CookieType) => {
  const currentTimeStamp = new Date().getTime() / 1000;
  const jwtExpired = cookie.expiresAt <= currentTimeStamp;
  // TODO: Check the JWT hash?
  if (jwtExpired) {
    throw new Error('Invalid cookie');
  }
};

export const checkToken = (ctx: Koa.Context, next: NextFunction) => {
  try {
    const jwt = ctx.cookies.get('sessionJwt') || false;
    if (jwt) {
      console.log('Token found: ', jwt);
      const cookie: CookieType = jwt_decode(jwt);
      console.log('Validating cookie: ', cookie);
      if (cookie) {
        validateJwt(cookie);
        ctx.state.id_hash = cookie.id_hash;
        next();
      } else {
        throw new Error('No cookie present');
      }
    }
  } catch (err) {
    console.log('Error in token check: ', err);
  }
};

// ONCE THE CHECKTOKEN ABOVE HAS VALIDATED WE CAN PROVIDE THE USERID
export const validated = (ctx: Koa.Context) => {
  try {
    console.log('Cookie validated, sending user ID: ', ctx.state.id_hash);
    ctx.body = JSON.stringify({ userId: ctx.state.id_hash });
  } catch (err) {
    console.log('Error in server validated cookie response: ', err);
  }
};

export const removeToken = (ctx: Koa.Context) => {
  try {
    const sessionJwt = expireSession();
    console.log('Expired JWT created: ', sessionJwt);
    ctx.cookie('sessionJwt', sessionJwt);
    ctx.status = 204;
  } catch (err) {
    console.log('Error removing cookie in backend: ', err);
  }
};
