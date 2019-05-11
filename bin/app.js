const Koa = require('koa');
const koaJWT = require('koa-jwt');

const body = require('./middleware/body');
const controller = require('./middleware/controller');

const appConfig = require('./config/app');

const app = new Koa();

app.use(koaJWT({secret: appConfig.secret, cookie: 'jwt'})
  .unless({path: ['/user/login', '/user/signup']}));

// Add body middleware
app.use(body());

// Add router middleware
app.use(controller());

module.exports = app;

app.listen(3000, () => {
  console.log('Server is running at port 3000...');
});