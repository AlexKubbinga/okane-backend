// Simon Roope 10/10/2022
// Example SQL 

//
// Subscription page - Latest Month, filtered by categories
//
select t.date, c.code, s.code, s.name, sum(t.value), sum(t.value_ytd), sum(t.value_ly)
from transactions t
join categories c on c.id = t.category_id
join subscriptions s on s.id = t.subscription_id
where c.code in ('ENT','FIT')
and t.date = '2022-09-30'
group by t.date, c.code, s.code, s.name;
and t.date = '2022-09-30';

//
// Merchants by Subscription, inc history
//
select t.date, s.code, s.name, m.code, m.name, m.short_name, sum(t.value), sum(t.value_ytd), sum(t.value_ly)
from transactions t
join subscriptions s on s.id = t.subscription_id
join merchants m on m.id = t.merchant_id 
where s.code = 'STR'
group by t.date, s.code, s.name, m.name, m.short_name, m.code
order by t.date, s.code, m.code;
