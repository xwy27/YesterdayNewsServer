const log = require('../utils/logger')('resLogger');

let userInfo = async ctx => {
  let userID = ctx.params.userID;
  log.info(`GET /user/info/${userID} Response: ...`);
  ctx.response.body = {
    userID: userID
  }
}

module.exports = {
  'GET /user/info/:userID': userInfo
}