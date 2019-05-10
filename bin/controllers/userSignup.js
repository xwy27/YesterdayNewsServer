const resLog = require('../utils/logger')('resLogger');
const errLog = require('../utils/logger')('errLogger');
const userDB = require('../database/user');
function isValid(username, password) {
  let [err, status] = userDB.checkUser({username: username, password: password});
  return (err === null && status === true);
}

let signup = async ctx => {
  let body = ctx.request.body;
  let username = body.username;
  let password = body.password;
  resLog.info(`POST /user/signup Data: user: ${username}, psd: ${password}`);
  if (isValid(username, password)) {
    let [err, status] = userDB.addUser({
      username: username,
      password: password,
      telephone: telephone
    });

    if (err !== null || status !== true) {  // fail to add into db
      errLog.err(`Fail to add user(${username}), error message: ${err}`);
      ctx.status = 401;
      ctx.response.body = {
        message: 'Internal server error'
      };
    } else { // signup success
      ctx.response.body = {
        message: 'success'
      };
    }
  } else {  // signup fail
    errLog.error(`Data mismatch: user: ${user}, psd: ${password}`);
    ctx.status = 401;
    ctx.response.body = {
      message: 'Invalid username'
    };
  }
}

module.exports = {
  'POST /user/signup': signup
}