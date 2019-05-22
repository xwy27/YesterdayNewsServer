const db = require('./db');
const dbConfig = require('../config/database');
const newsDB = require('./news');
const syncFunc = require('../utils/customSync');
const dbLogger = require('../utils/logger')('dbLogger');

/**
 * Add a comment into database
 * @param {string} userID user who comments
 * @param {string} newsID commented news
 * @param {string} content comment content
 * @return {Array} [err, insert comment id]
 */
async function addComment(userID, newsID, content) {
  let [err, rows] = await syncFunc(db.execSQL(
    `INSERT INTO ${dbConfig.commentTable} (userID, newsID, content)
    VALUES(${db.escape(userID)}, ${db.escape(newsID)}, ${db.escape(content)})`
    ));
  
  if (err) {
    dbLogger.error(`Error to add comment: ${userID}, ${newsID}`);
    return [err, null];
  }

  let [error, status] = await newsDB.updateNewsComments(newsID);

  if (error) {
    return [error, null];
  }

  dbLogger.info(`Add comment: ${userID}, ${newsID}`);
  return [null, rows.insertId];
}

/**
 * Return comments for news
 * @param {string} newsID 
 * @return {array} comments for newsID if there exists
 */
async function getComments(newsID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT *
    FROM ${dbConfig.commentTable}
    WHERE newsID = ${newsID}`
  ));
  
  if (err) {
    dbLogger.error(`Error to get comment for news:${newsID}`);
    return [err, null];
  }
  
  dbLogger.info(`Get comment for news:${newsID}`);
  return [null, rows];
}

/**
 * CLEAR ALL COMMENTS!!!
 */
async function clearComments() {
  let [err, rows] = await syncFunc(db.execSQL(
    `DELETE FROM ${dbConfig.commentTable}`
  ));

  dbLogger.warn(`CLEAR COMMENTS...`);
}

module.exports = {
  addComment: addComment,
  getComments: getComments,
  clearComments: clearComments
}