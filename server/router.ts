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
import {
  login,
  register,
  removeToken,
  validated,
} from './controllers/authorization';
import { getTransactionsBySubscription } from './controllers/transactionsBySubscription';
import { updateCategory } from './controllers/updateCategory';

// TODO clean router
// User routes
router.post('/postUsers', postUserData);
router.get('/getUsers', getUserData);

// Category routes
router.get('/getCategories', getCategories);
router.get('/getSubscriptions', getSubscriptions);
router.get('/getMerchants', getMerchants);

// Transaction routes
router.get('/getTransactions', getTransactions);
router.get('/categories', getTransactionsByCategory);
router.get('/subscriptions', getTransactionsBySubscription);
router.get('/calendar', getTransactionsByMerchant); // calendar
router.get('/merchants/:sub', getMerchantsBySubscription);

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/validate', validated);
router.get('/remove', removeToken);

// Update Category
router.put('/category', updateCategory);

// Test route
router.get('/testroute', (ctx, next) => {
  ctx.body = '<h1>Server test route</h1>'
})

export default router;
