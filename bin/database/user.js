const db = require('./db');
const dbConfig = require('../config/database');
const syncFunc = require('../utils/customSync');
const dbLogger = require('../utils/logger')('dbLogger');

async function addUser(user) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT username
    FROM ${dbConfig.userTable}
    WHERE username=${db.escape(user.username)}`
  ));
  
  if (err) {
    dbLogger.error(`Error to add user: ${user}, error message: ${err}`);
    return [err, false];
  }
  
  if (rows.length !== 0) {
    dbLogger.error(`Fail to add existed username: ${user.username}.`);
    return [null, false];
  }
  
  [err, rows] = await syncFunc(db.execSQL(
    `INSERT INTO ${dbConfig.userTable} (username, password, telephone)
    VALUES('${db.escape(user.username)}', '${db.escape(user.password)}', '${db.escape(user.telephone)}')`
  ));

  if (err) {
    dbLogger.error(`Error to add user: ${user}, error message: ${err}`);
    return [err, false];
  }

  dbLogger.info(`Add user: ${user}`);
  return [null, true];
}

async function checkUser(user) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT username
    FROM ${dbConfig.userTable}
    WHERE username=${db.escape(user.username)} AND password=${db.escape(user.password)}`
  ));

  if (err) {
    dbLogger.error(`Error to find user: ${user}, error message: ${err}`);
    return [err, false];
  }
  
  if (rows.length === 0) {
    dbLogger.error(`No match user: ${user}`);
    return [null, false];
  }

  dbLogger.info(`Find user: ${user}`);
  return [null, true];
}

async function updateUserInfo(user) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT username
    FROM ${dbConfig.userTable}
    WHERE username=${db.escape(user.username)}`
  ));

  if (err) {
    dbLogger.error(`Error to update user(${user.username}) info, error message: ${err}`);
    return [err, false];
  }
  
  if (rows.length === 0) {
    dbLogger.error(`No match user(${user.username}) to update info`);
    return [null, false];
  }

  [err, rows] = await syncFunc(db.execSQL(
    `UPDATE ${dbConfig.userTable}
    SET telephone='${db.escape(user.telephone)}', avatar='${db.escape(user.avatar)}'
    WHERE username='${db.escape(user.username)}'`
  ));
  
  dbLogger.info(`Update user(${user.username}) info`);
  return [null, true];
}

async function updateUserPassword(user) {
  let [err, status] = await checkUser({
    username: user.username,
    password: user.oldPassword
  });

  if (err) {
    dbLogger.error(`Error to change user(${user.username}) password, error message: ${err}`);
    return [err, false];
  }
  
  if (status !== true) {
    dbLogger.error(`No match user(${user.username}) to change password`);
    return [null, false];
  }

  [err, rows] = await syncFunc(db.execSQL(
    `UPDATE ${dbConfig.userTable}
    SET password='${db.escape(user.newPassword)}'
    WHERE username='${db.escape(user.username)}'`
  ));
  
  dbLogger.info(`Change user(${user.username}) password`);
  return [null, true];
}