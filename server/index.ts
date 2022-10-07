import Koa from 'koa';
const app = new Koa();
const PORT = 3000;
import route from './router';
import bodyParser from 'koa-bodyparser';
import { test } from './models/db';
test();

app.use(bodyParser());
app.use(route.routes());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
