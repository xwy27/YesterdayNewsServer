const db = require('./db');
const table = require('../config/database').table;
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
async function addComment(userID, newsID, time, content) {
  let res = {};
  let [err, rows] = await syncFunc(db.execSQL(
    `INSERT INTO ${table.comment} (userID, newsID, time, content)
    VALUES(${db.escape(userID)}, ${db.escape(newsID)}, ${db.escape(time)}, ${db.escape(content)})`
    ));
  
  if (err) {
    dbLogger.error(`Error to add comment: ${userID}, ${newsID},  error message:${err}`);
    return [err, null];
  }

  let [error, status] = await newsDB.updateNewsComments(newsID);

  if (error) {
    return [error, null];
  }

  dbLogger.info(`Add comment: ${userID}, ${newsID}`);

  res.commentID = rows.insertId;

  [err, rows] = await syncFunc(db.execSQL(
    `SELECT *
    FROM ${table.news}
    WHERE BINARY group_id=${db.escape(newsID)}`
  ));

  res.news = rows[0];

  return [null, res];
}

/**
 * Return comments for news
 * @param {string} newsID 
 * @return {array} comments for newsID if there exists
 */
async function getComments(newsID) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT *
    FROM ${table.comment}
    WHERE BINARY newsID = ${db.escape(newsID)}
    ORDER BY stars DESC, time DESC`
  ));
  
  if (err) {
    dbLogger.error(`Error to get comment for news:${newsID}, error message:${err}`);
    return [err, null];
  }
  
  dbLogger.info(`Get comment for news:${newsID}`);
  return [null, rows];
}

/**
 * Return stared comment list for user
 * @param {string} username commented user
 * @return {array} stared comment list for user if there exists
 */
async function getUserStarComments(username) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT c.commentID, c.userID, c.newsID, c.stars, c.time, c.content
    FROM ${table.comment} c, ${table.star} s
    WHERE BINARY s.userID=${db.escape(username)} AND s.commentID=c.commentID`
  ));
  
  if (err) {
    dbLogger.error(`Error to get star comments for user:${username}, error message:${err}`);
    return [err, null];
  }
  
  dbLogger.info(`Get star comments for user:${username}`);
  return [null, rows];
}

/**
 * Return commented news list for user
 * @param {string} username commented user
 * @return {array} commented news list for user if there exists
 */
async function getUserCommentsNews(username) {
  let [err, rows] = await syncFunc(db.execSQL(
    `SELECT a.group_id, a.title, a.author, a.time, a.comments, ifnull(b.stars, 0) AS stars
    FROM(SELECT n.group_id, n.title, n.author, n.time, n.comments
        FROM ${table.news} n, ${table.comment} c
        WHERE BINARY c.userID = ${db.escape(username)} AND BINARY c.newsID = n.group_id
        ORDER BY n.time) AS a LEFT JOIN
        (SELECT newsID, COUNT(*) AS stars
        FROM ${table.collection} c1
        GROUP BY c1.newsID) AS b
    ON a.group_id = b.newsID`
  ));
  
  if (err) {
    dbLogger.error(`Error to get commented News for user:${username}, error message:${err}`);
    return [err, null];
  }
  
  dbLogger.info(`Get commented News for user:${username}`);
  return [null, rows];
}

/**
 * Update comment star, add or delete
 * @param {int} commentID comment to be updated
 * @param {bool} type true for add, false for delete
 */
async function updateStarCount(commentID, type) {
  let symbol = (type ? '+' : '-');
  let [err, rows] = await syncFunc(db.execSQL(
    `UPDATE ${table.comment}
    SET stars = stars ${symbol} 1
    WHERE commentID = ${commentID}`
  ));

  if (err) {
    dbLogger.error(`Error to update comment:${commentID} star, error message: ${err}`);
    return [err, false];    
  }

  dbLogger.info(`Update comment:${commentID} star`);
  return [null, true];
}

/**
 * CLEAR ALL COMMENTS!!!
 */
async function clearComments() {
  let [err, rows] = await syncFunc(db.execSQL(
    `DELETE FROM ${table.comment}`
  ));

  dbLogger.warn(`CLEAR COMMENTS...`);
}

module.exports = {
  addComment: addComment,
  getComments: getComments,
  getUserComments: getUserCommentsNews,
  getUserStarComments: getUserStarComments,
  updateStarCount: updateStarCount,
  clearComments: clearComments
}