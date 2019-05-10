const resLog = require('../utils/logger')('resLogger');
const errLog = require('../utils/logger')('errLogger');
const checkUser = require('../database/user').checkUser;

function loginMatch(username, password) {
  let [err, status] = checkUser({username: username, password: password});
  return (err === null && status === true);
}

let login = async ctx => {
  let body = ctx.request.body;
  let username = body.username;
  let password = body.password;
  resLog.info(`POST /user/login Data: user: ${username}, psd: ${password}`);
  if (loginMatch(username, password)) { // login success
    ctx.response.body = {
      message: 'success'
    };
  } else {  // login fail
    errLog.error(`Data mismatch: user: ${username}, psd: ${password}`);
    ctx.status = 401;
    ctx.response.body = {
      message: 'Invalid username or password'
    };
  }
}

module.exports = {
  'POST /user/login': login
}