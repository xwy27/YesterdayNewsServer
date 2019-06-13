const db = require('./db');
const table = require('../config/database').table;
const syncFunc = require('../utils/customSync');
const dbLogger = require('../utils/logger')('dbLogger');

/**
 * Add a history into database
 * @param {string} userID user who reads news
 * @param {string} newsID read news
 * @return {Array} [err, insert_history_id]
 */
async function addHistory(userID, newsID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `INSERT INTO ${table.history} (userID, newsID)
    VALUES(${db.escape(userID)}, ${db.escape(newsID)})`
  ));
  
  if (err) {
    dbLogger.error(`Error to add history, user:${userID}, news:${newsID},  error message:${err}`);
    return [err, null];
  }

  dbLogger.info(`Add history, user:${userID}, news:${newsID}`);
  return [null, rows.insertId];
}

/**
 * Remove a history from database
 * @param {string} userID user who reads news
 * @param {string} newsID read news
 * @return {Array} [err, status]
 */
async function removeHistory(userID, newsID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `DELETE FROM ${table.history}
    WHERE BINARY userID=${db.escape(userID)} AND BINARY newsID=${db.escape(newsID)}`
  ));
  
  if (err) {
    dbLogger.error(`Error to remove history, user:${userID}, news:${newsID},  error message:${err}`);
    return [err, false];
  }

  dbLogger.info(`Remove history, user:${userID}, news:${newsID}`);
  return [null, true];
}

/**
 * Return history news list for user
 * @param {string} username user who read news
 * @return {array} read history news list for user if there exists
 */
async function getUserHistory(username) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT a.group_id, a.title, a.author, a.time, a.comments, ifnull(b.stars, 0) AS stars
    FROM (SELECT n.group_id, n.title, n.author, n.time, n.comments
          FROM ${table.news} n, ${table.history} h
          WHERE BINARY h.userID = ${db.escape(username)} AND BINARY h.newsID = n.group_id
          ORDER BY n.time) AS a LEFT JOIN
         (SELECT newsID, COUNT(*) AS stars
          FROM ${table.collection} c
          GROUP BY c.newsID) AS b
    ON a.group_id = b.newsID`
  ));
  
  if (err) {
    dbLogger.error(`Error to get history list for user:${username}, error message:${err}`);
    return [err, null];
  }
  
  dbLogger.info(`Get history list for user:${username}`);
  return [null, rows];
}

/**
 * CLEAR ALL HISTORY!!!
 */
async function clearHistory() {
  let [err, rows] = await syncFunc(db.execSQL(
    `DELETE FROM ${table.history}`
  ));

  dbLogger.warn(`CLEAR HISTORY...`);
}

module.exports = {
  addHistory: addHistory,
  removeHistory: removeHistory,
  getUserHistory: getUserHistory,
  clearHistory: clearHistory
}