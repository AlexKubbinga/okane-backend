import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/users';
import { getCategories } from './controllers/categories';
import { getSubscriptions } from './controllers/subscriptions';
import { getMerchants } from './controllers/merchants';
import { getTransactions } from './controllers/transactions';
import { getTransactionsByCategory } from './controllers/transactionsByCategory';
import { getTransactionsByMerchant } from './controllers/transactionsByMerchant';
import { getMerchantsBySubscription} from './controllers/merchantsBySubscription';
import {
  login,
  register,
  removeToken,
  validated,
} from './controllers/authorization';
import { getTransactionsBySubscription } from './controllers/transactionsBySubscription';

// User routes
router.post('/postUsers', postUserData);
router.get('/getUsers', getUserData);

// Category routes
router.get('/getCategories', getCategories);
router.get('/getSubscriptions', getSubscriptions);
router.get('/getMerchants', getMerchants);

// Transaction routes
router.get('/getTransactions', getTransactions);
router.get('/getTransactionsByCategory', getTransactionsByCategory);
router.get('/subscriptions', getTransactionsBySubscription);
router.get('/getTransactionsByMerchant', getTransactionsByMerchant);
router.get('/getMerchantsBySubscription/:sub', getMerchantsBySubscription);

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/validate', validated);
router.get('/remove', removeToken);

export default router;
