import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/user';
import { getCategories } from './controllers/categories';
import { getSubscriptions } from './controllers/subscriptions';
import { getTransactions } from './controllers/transactions';
import { login, register } from './controllers/authorization';

router.post('/postUsers', postUserData);
router.get('/getUsers', getUserData);
router.get('/getCategories', getCategories);
router.get('/getSubscriptions', getSubscriptions);
router.get('/getTransactions', getTransactions);

router.post('/register', register);
router.post('/login', login);

export default router;
