const Koa = require('koa');
const koaJWT = require('koa-jwt');

const body = require('./middleware/body');
const controller = require('./middleware/controller');
const static = require('./middleware/static');
const defaultLogger = require('./utils/logger')('default');

const appConfig = require('./config/app');

const app = new Koa();

app.use(koaJWT({secret: appConfig.secret, cookie: 'jwt'})
  .unless({ path: [
      '/user/verification',
      '/user/login',
      '/user/signup',
      /^\/news/,
      /^\/comment\/newsID=*/,
      /^\/image\/*/
]}));

// Add body middleware
app.use(body());

// Add router middleware
app.use(controller());

// Add static middleware
app.use(static());

module.exports = app;

app.listen(3000, () => {
  defaultLogger.trace('Server is running at port 3000...');
});