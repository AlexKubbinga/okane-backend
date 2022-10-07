import Router from 'koa-router';
const router = new Router();
import { postUserData } from './controllers/user';

router.post('/post', postUserData);
router.get('/', () => console.log('hello'));
export default router;
