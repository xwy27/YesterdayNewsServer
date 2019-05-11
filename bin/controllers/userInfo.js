const resLogger = require('../utils/logger')('resLogger');
const errLogger = require('../utils/logger')('errLogger');
const userDB = require('../database/user');

let getUserInfo = async ctx => {
  let username = ctx.params.username;
  resLogger.info(`GET /user/info/${username}`);
  let [err, info] = await userDB.getUserInfo(username);
  
  if (err !== null) { // error
    errLogger.error(`Fail getting user(${user.username}) info, error message: ${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    }
  } else if (info === null) { // no match data
    ctx.status = 401;
    ctx.response.body = {
      message: 'No match user.'
    }
  } else {  // success
    ctx.response.body = {
      username: info
    }
  }
}

let updateUserInfo = async ctx => {
  let body = ctx.request.body;
  let username = body.username;
  let telephone = body.telephone;
  let avatar = body.avatar;

  resLogger.info(`POST /user/info/${username}`);
  let [err, status] = await userDB.updateUserInfo({
    username: username,
    telephone: telephone,
    avatar: avatar
  });
  
  if (err !== null) { // error
    errLogger.error(`Fail updating user(${username}) info, error message: ${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    }
  } else if (status !== true) { // no match data
    ctx.status = 401;
    ctx.response.body = {
      message: 'No match user.'
    }
  } else {  // success
    ctx.response.body = {
      message: 'success'
    }
  }
}

module.exports = {
  'POST /user/info': updateUserInfo,
  'GET /user/info/:username': getUserInfo
}