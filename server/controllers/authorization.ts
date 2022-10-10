import { Request, Response, NextFunction, Router } from 'express';
import { CookieType } from '../models/customTypes';
import bcrypt from 'bcrypt';
import { createSession, expireSession } from '../session/stateless';
import jwt_decode from 'jwt-decode';
import db from '../models/db';
import Koa from 'koa';
import { stringify } from 'querystring';

// //REGISTER
export const register = async (ctx: Koa.Context) => {
	console.log('Calling the register controller');
	try {
		const body = ctx.request.body;
		//generate new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(body?.password, salt);

		//create new user
		const newUser = await db.users.create({
			id_hash: body?.id_hash,
			name: body?.name,
			email: body?.email,
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

// //LOGIN
export const login = async (ctx: Koa.Context) => {
	try {
		const body = ctx.request.body;

		const user = await db.users.findOne({
			email: body?.email,
		});
		if (!user) {
			ctx.status = 404;
			ctx.body = 'User Not Found';
			return;
		}

		const validPassword = await bcrypt.compare(body?.password, user.password);

		if (!validPassword) {
			ctx.status = 400;
			ctx.body = 'wrong password';
			return;
		}

		const sessionJwt = createSession(user.id_hash);
		console.log('New session JWT created: ', sessionJwt);
		ctx.cookie('sessionJwt', sessionJwt);
		ctx.body = user.id_hash;
		// const safeUser: SafeUserType = {
		// 	id_hash: user.id_hash,
		// 	picture: user.picture,
		// 	username: user.username,
		// 	followers: user.followers,
		// 	following: user.following,
		// };
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
		const jwt = ctx.request.header.cookie || false;
		if (jwt) {
			let token = jwt
				.split(';')
				.find((c) => c.trim().startsWith('sessionJwt='))
				?.split('=')[1];
			if (token) {
				console.log('Token found: ', jwt);
				const cookie: CookieType = jwt_decode(token);
				console.log('Validating cookie: ', cookie);
				if (cookie) {
					validateJwt(cookie);
					ctx.locals.userId = cookie.id_hash;
					next();
				} else {
					throw new Error('No cookie present');
				}
			}
		}
	} catch (err) {
		console.log('Error in token check: ', err);
	}
};

// ONCE THE CHECKTOKEN ABOVE HAS VALIDATED WE CAN PROVIDE THE USERID
export const validated = (ctx: Koa.Context) => {
	try {
		console.log('Cookie validated, sending user ID: ', ctx.locals.userId);
		ctx.body = JSON.stringify({ userId: ctx.locals.userId });
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