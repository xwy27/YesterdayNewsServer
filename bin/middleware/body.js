const koaBody = require('koa-body');

module.exports = function (opt) {
  return koaBody(opt || {
    // options to handle the post file
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // the max size of uploading file
    }
  });
};