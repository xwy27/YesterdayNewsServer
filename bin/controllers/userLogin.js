const jwt = require('jsonwebtoken');

const resLog = require('../utils/logger')('resLogger');
const errLog = require('../utils/logger')('errLogger');
const checkUser = require('../database/user').checkUser;

const appConfig = require('../config/app');

async function loginMatch(username, password) {
  let [err, status] = await checkUser({username: username, password: password});
  return (err === null && status === true);
}

let login = async ctx => {
  let body = ctx.request.body;
  let username = body.username;
  let password = body.password;
  if (username === undefined || password === undefined) {
    errLogger.error(`Fail logging in for incomplete data`);
    ctx.status = 401;
    ctx.response.body = {
      message: 'Invalid username or password'
    }
  }
  resLog.info(`POST /user/login Data: user: ${username}, psd: ${password}`);
  if (await loginMatch(username, password)) { // login success
    const token = jwt.sign({user: username}, appConfig.secret, {expiresIn: '1h'}); // sign token
    // set token inside cookie
    ctx.cookies.set('jwt', token, {
      httpOnly: true,
      overwrite: false
    });
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