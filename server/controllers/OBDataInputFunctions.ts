import { CreatedAt } from 'sequelize-typescript';
import db from '../models/db';
import { firstOfXMonthsAgo } from '../utils/dates';

type auth = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
};

export const findOrCreateMerchant_id = async (
  merchant: string,
  value: number
) => {
  const upperMerchant = merchant.toUpperCase();
  const lowerMerchant = merchant.toLowerCase();

  if (value > 0) return null;

  // ruleset comes into play
  // if merchant === 'Tfl Charge' || 'Tfl London' merchant === 'TFL'

  const [entry, created] = await db.merchants.findOrCreate({
    where: { name: merchant },
    defaults: {
      code: upperMerchant.substring(0, 3),
      short_name: lowerMerchant,
    },
  });

  return entry.dataValues.id;
};

export const findOrCreateUnknownSub = async () => {
  return await db.subscriptions.findOrCreate({
    where: { name: 'Unknown Subscription', code: 'UNDEF' },
  });
};

export const findOrCreateUnknownCat = async () => {
  return await db.categories.findOrCreate({
    where: { name: 'Unknown Category', code: 'UNDEF' },
  });
};

export const getAccessCode = async (
  code: string,
  client_id: string | undefined,
  client_secret: string | undefined
) => {
  const response = await fetch('https://api.tink.com/api/v1/oauth/token', {
    body: `code=${code}&client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
  });
  const output = (await response.json()) as auth;
  return output;
};

export const getTransactionsFromOB = async (access_token: string) => {
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
  return transactions;
};

export const getUserID = async (id_hash: string) => {
  const user = await db.users.findOne({
    where: { id_hash: id_hash },
  });

  return user.dataValues.id;
};
