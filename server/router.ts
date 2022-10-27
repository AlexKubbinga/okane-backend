import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/users';
import { getCategories } from './controllers/categories';
import { getSubscriptions } from './controllers/subscriptions';
import { getMerchants } from './controllers/merchants';
import { getTransactions } from './controllers/transactions';
import { getTransactionsByCategory } from './controllers/transactionsByCategory';
import { getTransactionsByMerchant } from './controllers/transactionsByMerchant';
import { getMerchantsBySubscription } from './controllers/merchantsBySubscription';
import { tinkOAuth } from './controllers/oauthOB';
import {
  login,
  register,
  removeToken,
  validated,
} from './controllers/authorization';
import { getTransactionsBySubscription } from './controllers/transactionsBySubscription';
import { updateCategory } from './controllers/updateCategory';
import { getSubscriptionCode } from './controllers/subscriptionCode';

// TODO clean router
// User routes
router.post('/postUsers', postUserData);
router.get('/getUsers', getUserData);

// Table Routes
router.get('/categoriesList', getCategories);
router.get('/subscriptionsList', getSubscriptions);
router.get('/api/merchantsList', getMerchants);
router.get('/transactionsList', getTransactions);

router.get('/api/categories', getTransactionsByCategory);
router.get('/api/subscriptions', getTransactionsBySubscription);
router.get('/api/calendar', getTransactionsByMerchant); // calendar
router.get('/api/merchants/:sub', getMerchantsBySubscription);

// Authentication routes
router.post('/api/register', register);
router.post('/api/login', login);
router.get('/api/validate', validated);
router.get('/api/remove', removeToken);

// Update Category
router.put('/api/category', updateCategory);

//Open Banking Verification
router.get('/callback', tinkOAuth);

router.get('/api/subscriptionCode/:merchant_id', getSubscriptionCode);

// Route with no db connection
router.get('/api/serverOnly', (ctx, next) => {
  console.log(`/serverOnly `)
  ctx.body = '<h1>Server only api route</h1>';
});

export default router;