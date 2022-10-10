import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/users';
import { getCategories } from './controllers/categories';
import { getSubscriptions } from './controllers/subscriptions';
import { getMerchants } from './controllers/merchants';
import { getTransactions } from './controllers/transactions';
import { getTransactionsByCategory } from './controllers/transactionsByCategory';
import { login, register } from './controllers/authorization';
import { getTransactionsBySubscription } from './controllers/transactionsBySubscription';

router.post('/postUsers', postUserData);
router.get('/getUsers', getUserData);
router.get('/getCategories', getCategories);
router.get('/getSubscriptions', getSubscriptions);
router.get('/getMerchants', getMerchants);
router.get('/getTransactions', getTransactions);
router.get('/getTransactionsByCategory', getTransactionsByCategory);
router.get('/getTransactionsBySubscription', getTransactionsBySubscription);
router.post('/register', register);
router.post('/login', login);

export default router;
