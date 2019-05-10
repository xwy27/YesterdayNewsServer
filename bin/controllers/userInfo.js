const resLogger = require('../utils/logger')('resLogger');
const errLogger = require('../utils/logger')('errLogger');
const getUserInfo = require('../database/user').getUserInfo;

let userInfo = async ctx => {
  let username = ctx.params.username;
  resLogger.info(`GET /user/info/${username} Response: ...`);
  let [err, info] = getUserInfo(username);
  
  if (err !== null) {
    errLogger.error(`Fail to find user(${username}), error message: ${err}`);
    ctx.status = 401;
    ctx.response.body = {
      message: 'Internal server error'
    }
  } else {
    ctx.response.body = {
      username: info
    }
  }
}

module.exports = {
  'GET /user/info/:username': userInfo
}