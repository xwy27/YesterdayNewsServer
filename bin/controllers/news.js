const resLogger = require('../utils/logger')('resLogger');
const errLogger = require('../utils/logger')('errLogger');
const newsDB = require('../database/news');

let getNewsContent = async ctx => {
  let newsID = ctx.params.newsID;
  resLogger.info(`GET /news/content/id=${newsID}`);
  let [err, content] = await newsDB.getNewsContent(newsID);
  if (err !== null) {
    errLogger.error(`Fail getting news:${newsID} content, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    };
  }

  ctx.response.body = {
    data: content
  };
};

let getNews = async ctx => {
  let offset = ctx.params.offset;
  let count = ctx.params.count;
  resLogger.info(`GET /news/list/offset=${offset}&count=${count}`);
  let [err, news] = await newsDB.getNews(parseInt(offset), parseInt(count));
  if (err !== null) {
    errLogger.error(`Fail getting news with offset:${offset}, count:${count}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    };
  }

  ctx.response.body = {
    data: news
  };
};

module.exports = {
  'GET /news/content/id=:newsID': getNewsContent,
  'GET /news/list/offset=:offset&count=:count': getNews
};