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

app.use(cors());
app.use(bodyParser());
app.use(route.routes());

(async () => {
  await db.sequelize.sync();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();

// sync your db
