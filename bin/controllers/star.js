const resLogger = require('../utils/logger')('resLogger');
const errLogger = require('../utils/logger')('errLogger');
const starDB = require('../database/star');
const commentDB = require('../database/comment');

let addStar = async ctx => {
  let body = ctx.requset.body;
  let commentID = body.commentID;
  let userID = body.userID;
  resLogger.info(`POST /star/creation`);
  if (commentID === undefined || userID === undefined) {
      errLogger.error(`Fail adding star for incomplete data`);
      ctx.status = 400;
      ctx.response.body = {
        message: 'Incomplete data'
      }
  }
  let [err, _] = await starDB.addStar(userID, commentID);
  if (err !== null) {
    errLogger.error(`Fail adding star for comment:${commentID}, user:${userID}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    }
  }

  let [error, data] = await starDB.countStar(commentID);
  
  if (error) {
    errLogger.error(`Fail add star for comment:${commentID}, user:${userID}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    }
  }
  
  await commentDB.updateStarCount(commentID, true);

  ctx.response.body = {
    count: data.count
  }
}

let removeStar = async ctx => {
  let body = ctx.requset.body;
  let commentID = body.commentID;
  let userID = body.userID;
  resLogger.info(`POST /star/deletion`);
  if (commentID === undefined || userID === undefined) {
      errLogger.error(`Fail delete star for incomplete data`);
      ctx.status = 400;
      ctx.response.body = {
        message: 'Incomplete data'
      }
  }
  let [err, status] = await starDB.removeStar(userID, commentID);
  if (err !== null) {
    errLogger.error(`Fail delete star for comment:${commentID}, user:${userID}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    }
  }
  
  let [error, data] = await starDB.countStar(commentID);
  
  if (error) {
    errLogger.error(`Fail delete star for comment:${commentID}, user:${userID}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    }
  }
  
  await commentDB.updateStarCount(commentID, false);

  ctx.response.body = {
    count: data.count
  }
}

module.exports = {
  'POST /star/creation': addStar,
  'POST /star/deletion': removeStar
}