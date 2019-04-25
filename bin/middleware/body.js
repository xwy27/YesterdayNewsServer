const koaBody = require('koa-body');

module.exports = function (opt) {
  return koaBody(opt);
}