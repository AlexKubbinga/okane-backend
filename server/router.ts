import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/user';
import { getSubscriptions } from './controllers/subscriptions';

router.post('/postUsers', postUserData);
router.get('/getUsers', getUserData);
router.get('/getSubscriptions', getSubscriptions);
router.get('/getCategories', getCategories);

export default router;
