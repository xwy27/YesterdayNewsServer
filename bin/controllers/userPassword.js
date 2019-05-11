const resLogger = require('../utils/logger')('resLogger');
const errLogger = require('../utils/logger')('errLogger');
const userDB = require('../database/user');

let updateUserPassword = async ctx => {
  let body = ctx.request.body;
  let username = body.username;
  let oldPassword = body.oldPassword;
  let newPassowrd = body.newPassword;

  resLogger.info(`POST /user/password`);
  let [err, status] = await userDB.updateUserPassword({
    username: username,
    oldPassword: oldPassword,
    newPassowrd: newPassowrd
  });
  
  if (err !== null) { // error
    errLogger.error(`Fail updating user(${username}) password, error message: ${err}`);
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
  'POST /user/password': updateUserPassword
}