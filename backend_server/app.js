const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const db = require('./src/models');
const parser = require('koa-bodyparser');
const cors = require('koa-cors');

const router = new Router();
router.get('/', async ctx => {
  // static 파일 호스팅
  await send(ctx, 'index.html', { root: __dirname + '/src' })
});

router.get('/say', async ctx => {
  ctx.body = await db.User.findAll();
});

router.post('/say', async ctx => {
  const { name, say } = ctx.request.body;
  try {
    await db.User.create({ name, say });
    ctx.body = "Success";
  } catch (err) {
    ctx.err = "Fail";
  }
});

const app = new Koa();
app
  .use(cors())
  .use(parser())
  .use(serve(__dirname + '/public'))
  .use(router.routes())
  .use(router.allowedMethods());

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});

module.exports = server;
