const resLog = require('../utils/logger')('resLogger');
const errLog = require('../utils/logger')('errLogger');

function isValid(user, password) {
  return false;
}

let signup = async ctx => {
  let body = ctx.request.body;
  let user = body.user;
  let password = body.password;
  resLog.info(`POST /user/signup Data: user: ${user}, psd: ${password}`);
  if (isValid(user, password)) { // signup success
    ctx.response.body = {
      message: 'success'
    };
  } else {  // signup fail
    errLog.error(`Data mismatch: user: ${user}, psd: ${password}`);
    ctx.response.body = {
      message: 'Invalid username'
    };
  }
}

module.exports = {
  'POST /user/signup': signup
}