const db = require('./db');
const dbConfig = require('../config/database');
const commentDB = require('./comment');
const syncFunc = require('../utils/customSync');
const dbLogger = require('../utils/logger')('dbLogger');

/**
 * Add a star into database
 * @param {string} userID user who comments
 * @param {int} commentID star comment
 * @return {Array} [err, insert_star_id]
 */
async function addStar(userID, commentID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `INSERT INTO ${dbConfig.starTable} (userID, commentID)
    VALUES(${db.escape(userID)}, ${db.escape(commentID)}})`
    ));
  
  if (err) {
    dbLogger.error(`Error to add star, user:${userID}, comment:${commentID},  error message:${err}`);
    return [err, null];
  }

  if (error) {
    return [error, null];
  }

  dbLogger.info(`Add star, user:${userID}, comment:${commentID}`);
  return [null, rows.insertId];
}

/**
 * Remove a star from database
 * @param {string} userID user who comments
 * @param {int} commentID comment to be checked
 * @return {Array} [err, status]
 */
async function removeStar(userID, commentID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `DELETE FROM ${dbConfig.starTable}
    WHERE userID=${db.escape(userID)} AND commentID=${db.escape(commentID)}`
  ));
  
  if (err) {
    dbLogger.error(`Error to remove star, user:${userID}, comment:${commentID},  error message:${err}`);
    return [err, false];
  }

  dbLogger.info(`Remove star, user:${userID}, comment:${commentID}`);
  return [null, true];
}

/**
 * Count stars for a comment
 * @param {int} commentID comment to be checked
 * @return {Array} [err, count] count = -1 if error occurs
 */
async function countStar(commentID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT COUNT(*)
    FROM ${dbConfig.starTable}
    GROUP BY commentID`
  ));
  
  if (err) {
    dbLogger.error(`Error to count star for comment:${commentID},  error message:${err}`);
    return [err, -1];
  }

  dbLogger.info(`Count star for comment:${commentID}`);
  return [null, rows[0]];
}

/**
 * CLEAR ALL COMMENTS!!!
 */
async function clearStars() {
  let [err, rows] = await syncFunc(db.execSQL(
    `DELETE FROM ${dbConfig.starTable}`
  ));

  dbLogger.warn(`CLEAR STARS...`);
}

module.exports = {
  addStar: addStar,
  countStar: countStar,
  removeStar: removeStar,
  clearStars: clearStars
}