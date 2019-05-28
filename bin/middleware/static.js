const path = require('path');
const static = require('koa-static');

const staticPath = '../static';

module.exports = () => {
  let p = path.join( __dirname,  staticPath);
  return static(p);
};