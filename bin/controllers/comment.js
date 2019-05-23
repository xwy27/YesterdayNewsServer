const resLogger = require('../utils/logger')('resLogger');
const errLogger = require('../utils/logger')('errLogger');
const commentDB = require('../database/comment');

let getComment = async ctx => {
  let newsID = ctx.params.newsID;
  resLogger.info(`GET /comment/newsID=${newsID}`);
  let [err, comments] = await commentDB.getComments(newsID);
  if (err !== null) {
    errLogger.error(`Fail getting comment for news:${newsID}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    }
  }

  ctx.response.body = {
    data: comments
  }
}

let addComment = async ctx => {
  let body = ctx.requset.body;
  let newsID = body.newsID;
  let userID = body.userID;
  let time = toString(body.time);
  let content = body.content;
  resLogger.info(`POST /comment`);
  if (newsID === undefined || userID === undefined ||
    time === undefined || content === undefined) {
      errLogger.error(`Fail adding comment for incomplete data`);
      ctx.status = 400;
      ctx.response.body = {
        message: 'Incomplete data'
      }
  }
  let [err, commentID] = await commentDB.addComment(userID, newsID, time, content);
  if (err !== null) {
    errLogger.error(`Fail adding comment for news:${newsID}, user:${userID}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    }
  }

  ctx.response.body = {
    data: commentID
  }
}

module.exports = {
  'GET /comment/newsID=:newsID': getComment,
  'POST /comment': addComment
}