const resLog = require('../utils/logger')('resLogger');
const errLog = require('../utils/logger')('errLogger');
const userDB = require('../database/user');

async function isValid(username, password) {
  let [err, status] = await userDB.checkUser({username: username, password: password});
  return (err === null && status === true);
}

let signup = async ctx => {
  let body = ctx.request.body;
  let username = body.username;
  let password = body.password;
  let telephone = body.telephone;
  resLog.info(`POST /user/signup Data: user: ${username}, psd: ${password}`);
  
  if (username === undefined || password === undefined || telephone === undefined ||
    username === '' || password === '' || telephone === '') {
      errLog.error(`Fail signing up for wrong data`);
      ctx.status = 400;
      ctx.response.body = {
        message: 'Incorrect user data'
      };
      return;
  }
  
  if (await isValid(username, password) !== true) {
    let [err, status] = await userDB.addUser({
      username: username,
      password: password,
      telephone: telephone
    });

    if (err !== null || status !== true) {  // fail to add into db
      errLog.error(`Fail to add user(${username}), error message: ${err}`);
      ctx.status = 500;
      ctx.response.body = {
        message: 'Internal server error'
      };
    } else { // signup success
      ctx.response.body = {
        message: 'success'
      };
    }
  } else {  // signup fail
    errLog.error(`User already exists: user: ${username}, psd: ${password}`);
    ctx.status = 401;
    ctx.response.body = {
      message: 'Invalid username'
    };
  }
};

module.exports = {
  'POST /user/signup': signup
};