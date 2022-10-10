import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/users';
import { getCategories } from './controllers/categories';
import { getSubscriptions } from './controllers/subscriptions';
import { getMerchants } from './controllers/merchants';
import { getTransactions } from './controllers/transactions';
import { getTransactionsByCategory } from './controllers/transactionsByCategory';
import { checkToken, login, register, validated } from './controllers/authorization';
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
router.get('/getTransactionsBySubscription', getTransactionsBySubscription);

// Authentication routes
router.post('/register', register);
router.post('/login', login);
router.get('/validate', checkToken, validated);

export default router;
