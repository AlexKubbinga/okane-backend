import jwt from 'jsonwebtoken';

interface SessionDataPayload extends jwt.JwtPayload {
	expiresAt: number;
	id_hash: string;
}

export const createSession = (id_hash: string) => {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + 1);

	const newSession = {
		expiresAt: expiry.valueOf(),
		id_hash: id_hash,
	};
	return jwt.sign(newSession, process.env.SUPER_SECRET_KEY as string);
};


export const expireSession = () => {
	const newSession = {
		expiresAt: -1,
		id_hash: 'Nope',
	};
	return jwt.sign(newSession, process.env.SUPER_SECRET_KEY as string);
};


export const getSession = (token: string) => {
	const sessionData = <SessionDataPayload>jwt.verify(token, process.env.SUPER_SECRET_KEY as string);

	if (sessionData.expiresAt < Date.now()) {
		console.log('Token has expired.');
		return undefined;
	}

	return sessionData;
};
