import Koa from 'koa';
import path from 'path';
import * as dotenv from 'dotenv';
import db from './models/db';
import route from './router';
import bodyParser from 'koa-bodyparser';
import { test } from './models/db';

dotenv.config({ path: path.resolve(__dirname, '../.env') });
const PORT = process.env.SERVER_PORT;

const app = new Koa();
const cors = require('@koa/cors');


app.use(cors({ allroutes: true, origin: '*', credentials: true}));
app.use(bodyParser());
app.use(route.routes());

// Middleware to use/decode jwt
app.use((ctx, next) => {
  const authHeader = ctx.cookies.get('sessionJwt');
  console.log('AuthHeader found: ', authHeader);
  if (authHeader) {
    ctx.headers.authorization = `Bearer ${authHeader}`;
  }
  next();
});

(async () => {
  await db.sequelize.sync();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

// sync your db
