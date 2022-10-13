import Koa from 'koa';
import path from 'path';
import * as dotenv from 'dotenv';
import db from './models/db';
import route from './router';
import bodyParser from 'koa-bodyparser';
import { checkToken } from './controllers/authorization';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const PORT = process.env.SERVER_PORT;

const app = new Koa();
const cors = require('@koa/cors');

app.use(cors({ allroutes: true, origin: '*', credentials: true }));
app.use(bodyParser());

// Middleware to use/decode jwt and pass on user ID.
app.use(async function (ctx, next) {
  if (ctx.url === '/login' || ctx.url === '/register') return next();
  return await checkToken(ctx, next);
});
app.use(route.routes());

(async () => {
  await db.sequelize.sync();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
