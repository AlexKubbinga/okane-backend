import Koa from 'koa';
import { firstOfXMonthsAgo, scaleValue } from '../utils/dates';

// import fetch from 'node-fetch';

type auth = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

export const tinkOAuth = async (ctx: Koa.Context) => {
  console.log('ctx query', ctx.query);
  const code = ctx.query.code as string;
  const credentials_id = ctx.query.credentials_id as string;
  const client_id = process.env.TINK_CLIENT_ID;
  const client_secret = process.env.TINK_SECRET;

  let response = await fetch('https://api.tink.com/api/v1/oauth/token', {
    body: `code=${code}&client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });
  const output = (await response.json()) as auth;

  const { access_token, expires_in, refresh_token } = output;

  const auth_header = new Headers();
  auth_header.set('Authorization', `Bearer ${access_token}`);

  const date = firstOfXMonthsAgo(1).toISOString().substring(0, 10);
  const transactionsRes = await fetch(
    `https://api.tink.com/data/v2/transactions?bookedDateGte=${date}`,
    { headers: auth_header }
  );
  const transactions: {
    transactions: {
      id: string;
      accountId: string;
      amount: {
        value: { unscaledValue: string; scale: string };
        currencyCode: string;
      };
      descriptions: { original: string; display: string };
      dates: { booked: string };
    }[];
    nextPageToken: string;
  } = await transactionsRes.json();
  console.log('TRANSACTIONS: ', transactions);

  for (let entry of transactions.transactions) {
    const merchant = entry.descriptions.display;
    const value = scaleValue(
      entry.amount.value.unscaledValue,
      entry.amount.value.scale
    );
  }

  ctx.redirect('http://localhost:3000/callback');
};
