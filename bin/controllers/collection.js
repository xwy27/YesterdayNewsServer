const resLogger = require('../utils/logger')('resLogger');
const errLogger = require('../utils/logger')('errLogger');
const collectionDB = require('../database/collection');

let addCollection = async ctx => {
  let body = ctx.request.body;
  let userID = body.userID;
  let newsID = body.newsID;
  resLogger.info(`POST /collection/creation`);
  if (newsID === undefined || userID === undefined) {
      errLogger.error(`Fail adding collection for incomplete data`);
      ctx.status = 400;
      ctx.response.body = {
        message: 'Incomplete data'
      };
  }
  let [err, data] = await collectionDB.addCollection(userID, newsID);
  if (err !== null) {
    errLogger.error(`Fail adding collection for user:${userID}, news:${newsID}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    };
  }

  ctx.response.body = {
    collection: data
  };
};

let removeCollection = async ctx => {
  let body = ctx.request.body;
  let userID = body.userID;
  let newsID = body.newsID;
  resLogger.info(`POST /collection/deletion`);
  if (newsID === undefined || userID === undefined) {
      errLogger.error(`Fail delete collection for incomplete data`);
      ctx.status = 400;
      ctx.response.body = {
        message: 'Incomplete data'
      };
  }
  let [err, status] = await collectionDB.removeCollection(userID, newsID);
  if (err !== null) {
    errLogger.error(`Fail delete collection for user:${userID}, news:${newsID}, error msg:${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    };
  }

  ctx.response.body = {
    message: 'Success'
  };
};

let getUserCollection = async ctx => {
  let username = ctx.params.username;
  resLogger.info(`GET /collection/username=${username}`);
  let [err, data] = await collectionDB.getUserCollection(username);
  if (err !== null) {
    errLogger.error(`Fail getting collection news list for user:${username}, error msg:${err}`);
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
  'GET /collection/username=:username': getUserCollection,
  'POST /collection/creation': addCollection,
  'POST /collection/deletion': removeCollection
}