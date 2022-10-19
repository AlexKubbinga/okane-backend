import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/users';
import { getCategories } from './controllers/categories';
import { getSubscriptionForMerchant, getSubscriptionName, getSubscriptions } from './controllers/subscriptions';
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
router.get('/subscriptions/:sub', getSubscriptionName);
router.get('/merchants', getMerchants);

// Transaction routes
router.get('/getTransactions', getTransactions);
router.get('/categories', getTransactionsByCategory);
router.get('/subscriptions', getTransactionsBySubscription);
router.get('/calendar', getTransactionsByMerchant); // calendar
router.get('/merchants/:sub', getMerchantsBySubscription);
router.get('/subscriptions/merchant/:merch', getSubscriptionForMerchant);

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/validate', validated);
router.get('/remove', removeToken);

// Update Category
router.put('/category', updateCategory);

export default router;
