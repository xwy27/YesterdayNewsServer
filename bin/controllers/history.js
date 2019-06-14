const resLogger = require('../utils/logger')('resLogger');
const errLogger = require('../utils/logger')('errLogger');
const historyDB = require('../database/history');

let addHistory = async ctx => {
  let body = ctx.request.body;
  let userID = body.userID;
  let newsID = body.newsID;
  resLogger.info(`POST /history/creation`);
  if (newsID === undefined || userID === undefined) {
      errLogger.error(`Fail adding history for incomplete data`);
      ctx.status = 400;
      ctx.response.body = {
        message: 'Incomplete data'
      };
  }
  let [err, data] = await historyDB.addHistory(userID, newsID);
  if (err !== null) {
    errLogger.error(`Fail adding history for user:${userID}, news:${newsID}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    };
  }

  ctx.response.body = {
    history: data
  };
}

let removeHistory = async ctx => {
  let body = ctx.request.body;
  let userID = body.userID;
  let newsID = body.newsID;
  resLogger.info(`POST /history/deletion`);
  if (newsID === undefined || userID === undefined) {
      errLogger.error(`Fail delete history for incomplete data`);
      ctx.status = 400;
      ctx.response.body = {
        message: 'Incomplete data'
      };
  }
  let [err, status] = await historyDB.removeHistory(userID, newsID);
  if (err !== null) {
    errLogger.error(`Fail delete history for user:${userID}, news:${newsID}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    };
  }

  ctx.response.body = {
    message: 'Success'
  };
};

let getUserHistory = async ctx => {
  let username = ctx.params.username;
  resLogger.info(`GET /history/username=${username}`);
  let [err, data] = await historyDB.getUserHistory(username);
  if (err !== null) {
    errLogger.error(`Fail getting history news list for user:${username}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    };
  }

  ctx.response.body = {
    data: data
  };
};

module.exports = {
  'GET /history/username=:username': getUserHistory,
  'POST /history/creation': addHistory,
  'POST /history/deletion': removeHistory
};