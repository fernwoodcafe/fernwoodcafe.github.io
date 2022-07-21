const Koa = require('koa');
const router = require('@koa/router')();
const dbClient = require('./dbClient');

const app = new Koa();

// response
router
  .get('/', async (ctx) => {
    const events = await dbClient.get();
    ctx.body = JSON.stringify(events, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2);
   })
  .post('/', async (ctx) => {
    const result = await dbClient.post();
    ctx.body = JSON.stringify(result, (_, v) => typeof v === 'bigint' ? v.toString() : v, 2);
   });

app.use(router.routes());

app.listen(3000);
