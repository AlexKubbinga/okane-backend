/*
 Simon Roope 9/10/2022
 Create Okane Postgres data
 /Applications/Postgres.app/Contents/Versions/14/bin/psql -p5432 "simonroope" -f --echo-all okane_postgres_data.sql
*/
\set ON_ERROR_STOP on

\echo 'TRUNCATE TABLES'

truncate table transactions cascade;
truncate table merchants cascade;
truncate table subscriptions cascade;
truncate table categories cascade;
truncate table users cascade;


\echo 'CREATE DATA'

\echo 'CREATE USERS DATA'
insert into users ( id_hash, name, password, email ) values ( '0xiiikkki112233', 'Simon Roope', '1234', 'simonroope@email.com' );
insert into users ( id_hash, name, password, email ) values ( '0xiiikkki112234', 'Scrooge McDuck', '$2b$10$wGys0G5H3Vd/SJV2BPCW7exnFwzW27tFHvn1g05NFo/Ui.Y5lZgVu', 'scrooge@email.com' );

\echo 'CREATE CATEGORIES DATA'
insert into categories ( code, name ) values ( 'EGY', 'Energy' );
insert into categories ( code, name ) values ( 'ENT', 'Entertainment' );
insert into categories ( code, name ) values ( 'FIT', 'Fitness' );
insert into categories ( code, name ) values ( 'HLH', 'Health' );
insert into categories ( code, name ) values ( 'INS', 'Insurance' );
insert into categories ( code, name ) values ( 'MTR', 'Motoring' );
insert into categories ( code, name ) values ( 'MON', 'Money' );

\echo 'CREATE SUBSCRIPTIONS DATA'
insert into subscriptions ( code, name ) values ( 'BDN', 'Broadband' );
insert into subscriptions ( code, name ) values ( 'CFN', 'Car Finance' );
insert into subscriptions ( code, name ) values ( 'CCD', 'Credit Card' );
insert into subscriptions ( code, name ) values ( 'ELC', 'Electricity' );
insert into subscriptions ( code, name ) values ( 'GYM', 'Gym' );
insert into subscriptions ( code, name ) values ( 'MBP', 'Mobile Phones' );
insert into subscriptions ( code, name ) values ( 'RST', 'Restaurants' );
insert into subscriptions ( code, name ) values ( 'STR', 'Streaming' );
insert into subscriptions ( code, name ) values ( 'TVL', 'Travel' );
insert into subscriptions ( code, name ) values ( 'WAT', 'Water' );

\echo 'CREATE MERCHANTS DATA'
insert into merchants ( code, name, short_name ) values ( 'AMZN', 'Amazon Prime', 'prime' );
insert into merchants ( code, name, short_name ) values ( 'APPL', 'Apple', 'apple' );
insert into merchants ( code, name, short_name ) values ( 'BTS', 'BT Sport', 'bt sport' );
insert into merchants ( code, name, short_name ) values ( 'DIS', 'Disney', 'disney' );
insert into merchants ( code, name, short_name ) values ( 'ESPT', 'Eurosport', 'eurosport' );
insert into merchants ( code, name, short_name ) values ( 'NFLX', 'Netflix', 'netflix' );
insert into merchants ( code, name, short_name ) values ( 'NOW', 'Now TV', 'nowtv' );
insert into merchants ( code, name, short_name ) values ( 'SKY', 'Sky', 'sky' );
insert into merchants ( code, name, short_name ) values ( 'SPT', 'Spotify', 'spotify' );

insert into merchants ( code, name, short_name ) values ( 'BT', 'BT', 'bt' );
insert into merchants ( code, name, short_name ) values ( 'VMED', 'Virgin Media', 'virgin' );

insert into merchants ( code, name, short_name ) values ( 'BMW', 'BMW', 'bmw' );
insert into merchants ( code, name, short_name ) values ( 'KRX', 'Kia', 'kia' );

insert into merchants ( code, name, short_name ) values ( 'FF', 'Fitness First', 'fitness first' );
insert into merchants ( code, name, short_name ) values ( 'PTON', 'Peleton', 'pelton' );

insert into merchants ( code, name, short_name ) values ( 'EON', 'E.on', 'e.on' );
insert into merchants ( code, name, short_name ) values ( 'OOA', 'Octopus', 'octopus' );

insert into merchants ( code, name, short_name ) values ( 'TFL', 'TFL', 'tfl' );
insert into merchants ( code, name, short_name ) values ( 'UBER', 'Uber', 'uber' );

insert into merchants ( code, name, short_name ) values ( 'SBRY', 'Sainsburys', 'sainsburys' );
insert into merchants ( code, name, short_name ) values ( 'TSCO', 'Tesco', 'tesco' );

insert into merchants ( code, name, short_name ) values ( 'SBUX', 'Starbucks', 'starbucks' );

insert into merchants ( code, name, short_name ) values ( 'EE', 'EE', 'ee' );
insert into merchants ( code, name, short_name ) values ( 'VOD', 'Vodafone', 'vodafone' );

insert into merchants ( code, name, short_name ) values ( 'NAT', 'Nationwide', 'nationwide' );

insert into merchants ( code, name, short_name ) values ( 'HFX', 'Halifax', 'halifax' );

\echo 'CREATE TRANSACTION DATA'

\echo User 1 - Jan22
insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-01-17 00:00:00-00', '2022-01-31 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'NFLX'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  10.99, 10.99, 9.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-01-31 00:00:00-00', '2022-01-31 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'AMZN'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  8.99, 8.99, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-01-01', '2022-01-31 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'DIS'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  7.99, 7.99, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-01-23 00:00:00-00', '2022-01-31 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'APPL'),
  (select id from subscriptions where code = 'MBP'),
  (select id from categories where code = 'ENT'),         -- ??
  34.99, 34.99, 33.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-01-12 00:00:00-00', '2022-01-31 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'FF'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  21.99, 21.99                                            -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-01-01 00:00:00-00', '2022-01-31 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'PTON'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  5, 5                                                    -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-01-19 00:00:00-00', '2022-01-31 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'BMW'),
  (select id from subscriptions where code = 'CFN'),
  (select id from categories where code = 'MTR'),
  175.45, 175.45, 175.45
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-01-13 00:00:00-00', '2022-01-31 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'HFX'),
  (select id from subscriptions where code = 'CCD'),
  (select id from categories where code = 'MON'),
  19.45, 19.45, 33.67
);


\echo User 1 - Feb22
insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-02-17 00:00:00-00', '2022-02-28 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'NFLX'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  10.99, 21.98, 9.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-02-28 00:00:00-00', '2022-02-28 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'AMZN'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  8.99, 17.98, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-02-01 00:00:00-00', '2022-02-28 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'DIS'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  7.99, 15.98, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-02-23 00:00:00-00', '2022-02-28 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'APPL'),
  (select id from subscriptions where code = 'MBP'),
  (select id from categories where code = 'ENT'),         -- ??
  34.99, 69.98, 33.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-02-12 00:00:00-00', '2022-02-28 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'FF'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  21.99, 43.98                                           -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-02-01 00:00:00-00', '2022-02-28 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'PTON'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  5, 10                                                   -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-02-19 00:00:00-00', '2022-02-28 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'BMW'),
  (select id from subscriptions where code = 'CFN'),
  (select id from categories where code = 'MTR'),
  175.45, 350.90, 175.45
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-02-19 00:00:00-00', '2022-02-28 00:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'HFX'),
  (select id from subscriptions where code = 'CCD'),
  (select id from categories where code = 'MON'),
  45.65, 65.10, 12.22
);


\echo User 1 - Mar22
insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-03-17 01:00:00-00', '2022-03-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'NFLX'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  10.99, 32.97, 9.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-03-31 01:00:00-00', '2022-03-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'AMZN'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  8.99, 26.97, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-03-01 01:00:00-00', '2022-03-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'DIS'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  7.99, 23.97, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-03-23 01:00:00-00', '2022-03-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'APPL'),
  (select id from subscriptions where code = 'MBP'),
  (select id from categories where code = 'ENT'),         -- ??
  34.99, 104.97, 33.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-03-12 01:00:00-00', '2022-03-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'FF'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  21.99, 65.97                                           -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-03-01 01:00:00-00', '2022-03-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'PTON'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  5, 15                                                   -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-03-19 01:00:00-00', '2022-03-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'BMW'),
  (select id from subscriptions where code = 'CFN'),
  (select id from categories where code = 'MTR'),
  175.45, 526.35, 175.45
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-03-19 01:00:00-00', '2022-03-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'HFX'),
  (select id from subscriptions where code = 'CCD'),
  (select id from categories where code = 'MON'),
  33.33, 98.43, 17.98
);


\echo User 1 - Apr22
insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-04-17 01:00:00-00', '2022-04-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'NFLX'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  10.99, 43.96, 9.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-04-30 01:00:00-00', '2022-04-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'AMZN'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  8.99, 35.96, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-04-01 01:00:00-00', '2022-04-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'DIS'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  7.99, 31.96, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-04-23 01:00:00-00', '2022-04-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'APPL'),
  (select id from subscriptions where code = 'MBP'),
  (select id from categories where code = 'ENT'),         -- ??
  34.99, 139.96, 33.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-04-12 01:00:00-00', '2022-04-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'FF'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  21.99, 87.96                                           -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-04-01 01:00:00-00', '2022-04-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'PTON'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  11.99, 26.99                                           -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-04-19 01:00:00-00', '2022-04-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'BMW'),
  (select id from subscriptions where code = 'CFN'),
  (select id from categories where code = 'MTR'),
  175.45, 701.80, 175.45
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-04-19 01:00:00-00', '2022-04-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'HFX'),
  (select id from subscriptions where code = 'CCD'),
  (select id from categories where code = 'MON'),
  12.06, 110.49, null                                            -- NO LY
);


\echo User 1 - May22
insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-05-17 01:00:00-00', '2022-05-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'NFLX'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  10.99, 54.95, 9.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-05-31 01:00:00-00', '2022-05-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'AMZN'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  8.99, 44.95, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-05-01 01:00:00-00', '2022-05-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'DIS'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  7.99, 39.95, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-05-23 01:00:00-00', '2022-05-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'APPL'),
  (select id from subscriptions where code = 'MBP'),
  (select id from categories where code = 'ENT'),         -- ??
  34.99, 174.95, 33.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-05-12 01:00:00-00', '2022-05-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'FF'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  21.99, 109.95                                           -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-05-01 01:00:00-00', '2022-05-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'PTON'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  11.99, 38.98                                           -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-05-19 01:00:00-00', '2022-05-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'BMW'),
  (select id from subscriptions where code = 'CFN'),
  (select id from categories where code = 'MTR'),
  175.45, 877.25, 175.45
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-05-19 01:00:00-00', '2022-05-31', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'HFX'),
  (select id from subscriptions where code = 'CCD'),
  (select id from categories where code = 'MON'),
  null, 110.49, 23.23
);


\echo User 1 - Jun22
insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-06-17 01:00:00-00', '2022-06-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'NFLX'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  10.99, 65.94, 9.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-06-30 01:00:00-00', '2022-06-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'AMZN'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  8.99, 53.94, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-06-01 01:00:00-00', '2022-06-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'DIS'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  7.99, 43.94, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-06-23 01:00:00-00', '2022-06-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'APPL'),
  (select id from subscriptions where code = 'MBP'),
  (select id from categories where code = 'ENT'),         -- ??
  34.99, 209.94, 33.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-06-12 01:00:00-00', '2022-06-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'FF'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  21.99, 131.94                                           -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-06-01 01:00:00-00', '2022-06-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'PTON'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  11.99, 38.98                                          -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-06-19 01:00:00-00', '2022-06-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'BMW'),
  (select id from subscriptions where code = 'CFN'),
  (select id from categories where code = 'MTR'),
  175.45, 877.25, 175.45
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-06-19 01:00:00-00', '2022-06-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'HFX'),
  (select id from subscriptions where code = 'CCD'),
  (select id from categories where code = 'MON'),
  null, 110.49, 23.23
);


\echo User 1 - Jul22
insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-07-17 01:00:00-00', '2022-07-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'NFLX'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  10.99, 76.93, 9.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-07-31 01:00:00-00', '2022-07-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'AMZN'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  8.99, 62.93, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-07-01 01:00:00-00', '2022-07-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'DIS'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  7.99, 51.93, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-07-23 01:00:00-00', '2022-07-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'APPL'),
  (select id from subscriptions where code = 'MBP'),
  (select id from categories where code = 'ENT'),        -- ??
  34.99, 244.93, 33.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-07-12 01:00:00-00', '2022-07-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'FF'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  21.99, 153.93                                           -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-07-01 01:00:00-00', '2022-07-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'PTON'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  11.99, 50.97                                          -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-07-19 01:00:00-00', '2022-07-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'BMW'),
  (select id from subscriptions where code = 'CFN'),
  (select id from categories where code = 'MTR'),
  175.45, 1052.7, 175.45
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-07-19 01:00:00-00', '2022-07-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'HFX'),
  (select id from subscriptions where code = 'CCD'),
  (select id from categories where code = 'MON'),
  null, 110.49, null
);


\echo User 1 - Aug22
insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-08-17 01:00:00-00', '2022-08-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'NFLX'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  10.99, 87.92, 10.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-08-31 01:00:00-00', '2022-08-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'AMZN'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  8.99, 71.92, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-08-01 01:00:00-00', '2022-08-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'DIS'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  7.99, 59.92, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-08-23 01:00:00-00', '2022-08-31', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'APPL'),
  (select id from subscriptions where code = 'MBP'),
  (select id from categories where code = 'ENT'),         -- ??
  34.99, 279.92, 33.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly)
values
(
  '2022-08-12 01:00:00-00', '2022-08-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'FF'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  21.99, 175.92, 21.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-08-01 01:00:00-00', '2022-08-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'PTON'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  11.99, 62.96                                           -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-08-19 01:00:00-00', '2022-08-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'BMW'),
  (select id from subscriptions where code = 'CFN'),
  (select id from categories where code = 'MTR'),
  175.45, 1228.15, 175.45
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-08-19 01:00:00-00', '2022-08-31 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'HFX'),
  (select id from subscriptions where code = 'CCD'),
  (select id from categories where code = 'MON'),
  33.33, 143.82, null
);


\echo User 1 - Sep22
insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-17 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'NFLX'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  10.99, 98.91, 10.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-30 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'AMZN'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  8.99, 80.91, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-01 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'DIS'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  7.99, 59.92, 6.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-23 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'APPL'),
  (select id from subscriptions where code = 'MBP'),
  (select id from categories where code = 'ENT'),        -- ??
  34.99, 314.91, 33.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly)
values
(
  '2022-09-12 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'FF'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  21.99, 197.91, 21.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-09-01 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'PTON'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  11.99, 74.95                                          -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-19 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'BMW'),
  (select id from subscriptions where code = 'CFN'),
  (select id from categories where code = 'MTR'),
  175.45, 1403.6, 175.45
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-19 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Simon Roope'), (select id_hash from users where name = 'Simon Roope'),
  (select id from merchants where code = 'HFX'),
  (select id from subscriptions where code = 'CCD'),
  (select id from categories where code = 'MON'),
  56.56, 200.38, 16.01
);


\echo User 2 - Sep22
insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-03 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Scrooge McDuck'), (select id_hash from users where name = 'Scrooge McDuck'),
  (select id from merchants where code = 'NFLX'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  99.99, 99.99, 99.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-12 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Scrooge McDuck'), (select id_hash from users where name = 'Scrooge McDuck'),
  (select id from merchants where code = 'AMZN'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  99.99, 99.99, 99.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-12 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Scrooge McDuck'), (select id_hash from users where name = 'Scrooge McDuck'),
  (select id from merchants where code = 'DIS'),
  (select id from subscriptions where code = 'STR'),
  (select id from categories where code = 'ENT'),
  99.99, 99.99, 99.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-23 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Scrooge McDuck'), (select id_hash from users where name = 'Scrooge McDuck'),
  (select id from merchants where code = 'APPL'),
  (select id from subscriptions where code = 'MBP'),
  (select id from categories where code = 'ENT'),        -- ??
  99.99, 99.99, 99.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly)
values
(
  '2022-09-18 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Scrooge McDuck'), (select id_hash from users where name = 'Scrooge McDuck'),
  (select id from merchants where code = 'FF'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  99.99, 99.99, 99.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd )
values
(
  '2022-09-07 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Scrooge McDuck'), (select id_hash from users where name = 'Scrooge McDuck'),
  (select id from merchants where code = 'PTON'),
  (select id from subscriptions where code = 'GYM'),
  (select id from categories where code = 'FIT'),
  11.99, 74.95                                          -- NO LY
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-21 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Scrooge McDuck'), (select id_hash from users where name = 'Scrooge McDuck'),
  (select id from merchants where code = 'BMW'),
  (select id from subscriptions where code = 'CFN'),
  (select id from categories where code = 'MTR'),
  99.99, 99.99, 99.99
);

insert into transactions ( date, month_end_date, ccy, user_id, user_id_hash, merchant_id, subscription_id, category_id, value, value_ytd, value_ly )
values
(
  '2022-09-27 01:00:00-00', '2022-09-30 01:00:00-00', 'GBP',
  (select id from users where name = 'Scrooge McDuck'), (select id_hash from users where name = 'Scrooge McDuck'),
  (select id from merchants where code = 'HFX'),
  (select id from subscriptions where code = 'CCD'),
  (select id from categories where code = 'MON'),
  99.99, 99.99, 99.99
);


\echo 'CREATE DATA SUCCESS'