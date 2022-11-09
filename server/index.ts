import Koa from 'koa';
import path from 'path';
import * as dotenv from 'dotenv';
import db from './models/db';
import route from './router';
import bodyParser from 'koa-bodyparser';
import { checkToken } from './controllers/authorization';
import config from './config';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const PORT = config.serverPort;
const DB_HOST = config.dbHost;

const app = new Koa();
const cors = require('@koa/cors');

app.proxy = true;

app.use(cors({ 
  allroutes: true, 
  origin: 'https://okane-money.netlify.app', 
  credentials: true 
}));
app.use(bodyParser());

// Middleware to use/decode jwt and pass on user ID.
app.use(async function (ctx, next) {
  if (ctx.url === '/api/login' || ctx.url === '/api/register') return next();
  return await checkToken(ctx, next);
});
app.use(route.routes());

(async () => {
  await db.sequelize.sync();
  app.listen(PORT, DB_HOST, () => console.log(`Server running on port ${PORT}`));
})();
