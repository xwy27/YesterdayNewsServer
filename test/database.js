const chai = require('chai');

const newsDB = require('../bin/database/news');
const userDB = require('../bin/database/user');
const starDB = require('../bin/database/star');
const historyDB = require('../bin/database/history');
const commentDB = require('../bin/database/comment');
const collectionDB = require('../bin/database/collection');

describe('Database testing', () => {
  let commentID = 0;
  let newsID = 'xR3j8OFadd1kDojaK+J0pA==';

  before(async () => {
    [err, data] = await userDB.addUser({
      username: 'test',
      password: 'test',
      telephone: '12345678901'
    });

    [err, data] = await commentDB.addComment(
      'test', newsID, new Date().getTime(), 'test'
    );
    
    commentID = data.commentID;

    await starDB.addStar('test', commentID);
  });

  after(async () => {
    let [err, data] = await userDB.removeUser('test');
    if (err !== null) {
      console.log(err);
      process.exit(1);
    }
    [err, data] = await userDB.removeUser('test2');
    if (err !== null) {
      console.log(err);
      process.exit(1);
    }

    process.exit(0);
  });

  // ------------------------------ USER TESETING ------------------------------
  it('Add an exist user', async () => {
    let [err, data] = await userDB.addUser({
      username: 'test',
      password: 'test',
      telephone: '12345678901'
    });
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.be.false;
  });

  it('Add a new user', async () => {
    let [err, data] = await userDB.addUser({
      username: 'test2',
      password: 'test',
      telephone: '12345678901'
    });
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.be.true;
  });

  it('Check existed user', async () => {
    let [err, data] = await userDB.checkUser({
      username: 'test',
      password: 'test'
    });
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.be.true;
  });

  it('Get user info', async () => {
    let [err, data] = await userDB.getUserInfo('test');
    chai.expect(err).to.be.a('null');
    chai.expect(data.telephone).to.equal('12345678901');
  });

  it('Update user info, avatar and password', async () => {
    let [err, data] = await userDB.updateUserInfo({
      username: 'test',
      telephone: '11111111111'
    });
    chai.expect(err).to.be.a('null');

    [err, data] = await userDB.updateUserAvatar({
      username: 'test',
      avatar: '123'
    });
    chai.expect(err).to.be.a('null');

    [err, data] = await userDB.updateUserPassword({
      username: 'test',
      oldPassword: 'test',
      newPassword: 'ttt'
    });
    chai.expect(err).to.be.a('null');

    [err, data] = await userDB.getUserInfo('test');
    chai.expect(err).to.be.a('null');
    chai.expect(data.telephone).to.equal('11111111111');
    chai.expect(data.avatar).to.equal('123');

    [err, data] = await userDB.checkUser({
      username: 'test',
      password: 'ttt'
    });
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.equal(true);
  });

  // ------------------------------ NEWS TESTING ------------------------------
  it('Get news list', async () => {
    let [err, data] = await newsDB.getNews(0, 10);
    chai.expect(err).to.be.a('null');
    chai.expect(data.length).to.equal(10);
  });

  it('Get news detail', async () => {
    let [err, data] = await newsDB.getNewsContent(newsID);
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.not.be.a('null');
  });

  // ------------------------------ COMMENT TESETING ------------------------------
  it('Add a new comment', async () => {
    let [err, data] = await commentDB.addComment(
      'test', newsID, new Date().getTime(), 'test and test'
    );
    chai.expect(err).to.be.a('null');
    chai.expect(data.commentID).to.be.a('Number');
  });

  it('Get comment for news', async () => {
    let [err, data] = await commentDB.getComments(newsID);
    chai.expect(err).to.be.a('null');
    chai.expect(data.length).to.not.equal(0);
  });

  it('Get comment for user', async () => {
    let [err, data] = await commentDB.getUserComments('test');
    chai.expect(err).to.be.a('null');
    chai.expect(data.length).to.equal(2);
    chai.expect(data[0].stars).to.equal(0);
  });

  // ------------------------------ STAR TESTING ------------------------------
  it('Add star for comment', async () => {
    let [err, data] = await starDB.addStar('test2', commentID);
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.be.a('Number');
  });

  it('Count star for comment', async () => {
    let [err, data] = await starDB.countStar(commentID);
    chai.expect(err).to.be.a('null');
    chai.expect(data.count).to.equal(2);
  });

  it('Get star comment list for user', async () => {
    let [err, data] = await commentDB.getUserStarComments('test');
    chai.expect(err).to.be.a('null');
    chai.expect(data.length).to.equal(1);
    chai.expect(data[0].stars).to.equal(2);
  });

  it('Get star comment news list for user', async () => {
    let [err, data] = await starDB.getUserStars('test');
    chai.expect(err).to.be.a('null');
    chai.expect(data.length).to.equal(1);
    chai.expect(data[0].stars).to.equal(0);
  });

  it('Remove star for comment', async () => {
    let [err, data] = await starDB.removeStar('test', commentID);
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.equal(true);
  });

  // ------------------------------ COLLECTION TESTING ------------------------------
  it('Add collection', async () => {
    let [err, data] = await collectionDB.addCollection('test', newsID);
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.be.a('Number');
  });

  it('Get collection list for user', async () => {
    let [err, data] = await collectionDB.getUserCollection('test');
    chai.expect(err).to.be.a('null');
    chai.expect(data.length).to.equal(1);
    chai.expect(data[0].stars).to.equal(1);
  });

  it('Remove collection', async () => {
    let [err, data] = await collectionDB.removeCollection('test', newsID);
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.equal(true);
  });

  // ------------------------------ HISTORY TESTING ------------------------------
  it('Add history', async () => {
    let [err, data] = await historyDB.addHistory('test', newsID);
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.be.a('Number');
  });

  it('Get history list for user', async () => {
    let [err, data] = await historyDB.getUserHistory('test');
    chai.expect(err).to.be.a('null');
    chai.expect(data.length).to.equal(1);
    chai.expect(data[0].stars).to.equal(0);
  });

  it('Remove history', async () => {
    let [err, data] = await historyDB.removeHistory('test', newsID);
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.equal(true);

    [err, data] = await historyDB.getUserHistory('test');
    chai.expect(err).to.be.a('null');
    chai.expect(data.length).to.equal(0);
  });
});