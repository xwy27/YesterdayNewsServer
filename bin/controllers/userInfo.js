const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const resLogger = require('../utils/logger')('resLogger');
const defaultLogger = require('../utils/logger')('default');
const errLogger = require('../utils/logger')('errLogger');
const userDB = require('../database/user');
const saveFile = require('../utils/saveFile');

let getUserInfo = async ctx => {
  let username = ctx.params.username;
  resLogger.info(`GET /user/info/${username}`);
  let [err, info] = await userDB.getUserInfo(username);
  
  if (err !== null) { // error
    errLogger.error(`Fail getting user(${user.username}) info, error message: ${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    };
  } else if (info === null) { // no match data
    ctx.status = 401;
    ctx.response.body = {
      message: 'No match user.'
    };
  } else {  // success
    ctx.response.body = {
      username: info
    };
  }
};

let updateUserInfo = async ctx => {
  let body = ctx.request.body;
  let username = body.username;
  let telephone = body.telephone;

  resLogger.info(`POST /user/info/${username}`);
  let [err, status] = await userDB.updateUserInfo({
    username: username,
    telephone: telephone
  });
  
  if (err !== null) { // error
    errLogger.error(`Fail updating user(${username}) info, error message: ${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    };
  } else if (status !== true) { // no match data
    ctx.status = 401;
    ctx.response.body = {
      message: 'No match user.'
    };
  } else {  // success
    ctx.response.body = {
      message: 'success'
    };
  }
};

let uploadAvatar = async ctx => {
  let username = ctx.request.body.username;
  let avatarFile = ctx.request.files.file;

  resLogger.info(`POST /user/avatar`);
  let avatarName = username;
  let filePath = path.join(__dirname, '../static/image/avatar/', `${avatarName}`);
  saveFile(avatarFile, filePath + '.png');
  let [err, status] = await userDB.updateUserAvatar({
    username: username,
    avatar: avatarName
  });

  if (err !== null) { // error
    errLogger.error(`Fail updating user(${username}) avatar, error message: ${err}`);
    ctx.status = 500;
    ctx.response.body = {
      message: 'Internal server error'
    };
  } else if (status !== true) { // no match data
    ctx.status = 401;
    ctx.response.body = {
      message: 'No match user.'
    };
  } else {  // success
    ctx.response.body = {
      avatar: avatarName
    };
  }
};

module.exports = {
  'POST /user/info': updateUserInfo,
  'GET /user/info/:username': getUserInfo,
  'POST /user/avatar': uploadAvatar
};