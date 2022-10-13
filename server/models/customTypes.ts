export type CookieType = {
  expiresAt: number;
  id_hash: string;
  iat: number;
};

export interface MerchantBySubscriptionType {
  month_end_date: string;
  merchant: {name: string,
             short_name: string};
  value: number;
}

export interface ArrayMerchantRecordType {
  [ key: string ]: number;
}

export interface MerchantBySubscriptionOutputType {
  [ key: string ]: number | string
}