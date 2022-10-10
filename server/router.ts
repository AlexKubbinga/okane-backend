import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/user';
import { getSubscriptions } from './controllers/subscriptions';
import { getTransactions } from './controllers/transactions';

router.post('/postUsers', postUserData);
router.get('/getUsers', getUserData);
router.get('/getSubscriptions', getSubscriptions);
router.get('/getTransactions', getTransactions);
export default router;
