const resLog = require('../utils/logger')('resLogger');
const errLog = require('../utils/logger')('errLogger');

function loginMatch(user, password) {
  return false;
}

let login = async ctx => {
  let body = ctx.request.body;
  let user = body.user;
  let password = body.password;
  resLog.info(`POST /user/login Data: user: ${user}, psd: ${password}`);
  if (loginMatch(user, password)) { // login success
    ctx.response.body = {
      message: 'success'
    };
  } else {  // login fail
    errLog.error(`Data mismatch: user: ${user}, psd: ${password}`);
    ctx.response.body = {
      message: 'User Error or Password Error'
    };
  }
}

module.exports = {
  'POST /user/login': login
}