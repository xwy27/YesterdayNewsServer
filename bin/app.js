const Koa = require('koa');

const logger = require('./middleware/logger');
const body = require('./middleware/body');
const controller = require('./middleware/controller');

const app = new Koa();

// Add logger middleware
app.use(logger());

// Add body middleware
app.use(body());

// Add router middleware
app.use(controller());

module.exports = app;

app.listen(3000, () => {
  console.log('Server is running at port 3000...');
});