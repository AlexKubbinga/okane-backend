import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/user';
import { getSubscriptions } from './controllers/subscriptions';

router.post('/postUser', postUserData);
router.get('/getUser', getUserData);
router.get('/subscriptions', getSubscriptions);

export default router;
