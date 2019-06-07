const chai = require('chai');

const newsDB = require('../bin/database/news');
const userDB = require('../bin/database/user');
const starDB = require('../bin/database/star');
const commentDB = require('../bin/database/comment');

describe('Database testing', () => {
  let commentID = 0;
  let newsID = 'xR3j8OFadd1kDojaK+J0pA==';

  before(async () => {
    [err, data] = await userDB.addUser({
      username: 'test',
      password: 'test',
      telephone: '12345678901'
    });

    [err, commentID] = await commentDB.addComment(
      'test', newsID, new Date().getTime(), 'test'
    );
    
    await starDB.addStar('test', commentID);
  });

  after(async () => {
    await userDB.removeUser('test');
    await userDB.removeUser('test2');
    await commentDB.clearComments();
    await starDB.clearStars();
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
    chai.expect(data).to.be.a('Number');
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

  it('Get star list for user', async () => {
    let [err, data] = await starDB.getUserStars('test');
    chai.expect(err).to.be.a('null');
    chai.expect(data.length).to.equal(1);
  });

  it('Remove star for comment', async () => {
    let [err, data] = await starDB.removeStar('test', commentID);
    chai.expect(err).to.be.a('null');
    chai.expect(data).to.equal(true);
  });
});