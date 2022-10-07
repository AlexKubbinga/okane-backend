import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/user';

router.post('/post', postUserData);
router.get('/get', getUserData);

export default router;
