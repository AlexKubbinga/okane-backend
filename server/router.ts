import Router from 'koa-router';
const router = new Router();
import { postUserData, getUserData } from './controllers/user';

router.post('/postUser', postUserData);
router.get('/getUser', getUserData);

export default router;
