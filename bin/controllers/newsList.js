const resLogger = require('../utils/logger')('resLogger');
const errLogger = require('../utils/logger')('errLogger');
const newsDB = require('../database/news');

let getNews = async ctx => {
  let offset = ctx.params.offset;
  let count = ctx.params.count;
  resLogger.info(`GET /news/list/offset=${offset}&count=${count}`);
  let [err, news] = await newsDB.getNews(parseInt(offset), parseInt(count));
  if (err !== null) {
    errLogger.error(`Fail getting news with offset:${offset}, count:${count}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    }
  }

  ctx.response.body = {
    data: news
  }
}

module.exports = {
  'GET /news/list/offset=:offset&count=:count': getNews
}