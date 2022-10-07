import Koa from 'koa';


const app = new Koa();
const PORT = 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));