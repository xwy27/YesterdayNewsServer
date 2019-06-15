# API-Design

<!-- TOC -->

- [API-Design](#api-design)
  - [News](#news)
    - [获取新闻列表](#%E8%8E%B7%E5%8F%96%E6%96%B0%E9%97%BB%E5%88%97%E8%A1%A8)
      - [Response](#response)
      - [Request Sample](#request-sample)
    - [获取新闻详情](#%E8%8E%B7%E5%8F%96%E6%96%B0%E9%97%BB%E8%AF%A6%E6%83%85)
      - [Response](#response-1)
      - [Request Sample](#request-sample-1)
  - [Comment](#comment)
    - [获取新闻评论列表](#%E8%8E%B7%E5%8F%96%E6%96%B0%E9%97%BB%E8%AF%84%E8%AE%BA%E5%88%97%E8%A1%A8)
      - [Response](#response-2)
      - [Request Sample](#request-sample-2)
    - [获取个人评论新闻列表](#%E8%8E%B7%E5%8F%96%E4%B8%AA%E4%BA%BA%E8%AF%84%E8%AE%BA%E6%96%B0%E9%97%BB%E5%88%97%E8%A1%A8)
      - [Response](#response-3)
      - [Request Sample](#request-sample-3)
    - [提交评论](#%E6%8F%90%E4%BA%A4%E8%AF%84%E8%AE%BA)
      - [Response](#response-4)
      - [Request Sample](#request-sample-4)
  - [Star](#star)
    - [获取个人点赞评论列表](#%E8%8E%B7%E5%8F%96%E4%B8%AA%E4%BA%BA%E7%82%B9%E8%B5%9E%E8%AF%84%E8%AE%BA%E5%88%97%E8%A1%A8)
      - [Response](#response-5)
      - [Request Sample](#request-sample-5)
    - [获取个人点赞评论所属新闻列表](#%E8%8E%B7%E5%8F%96%E4%B8%AA%E4%BA%BA%E7%82%B9%E8%B5%9E%E8%AF%84%E8%AE%BA%E6%89%80%E5%B1%9E%E6%96%B0%E9%97%BB%E5%88%97%E8%A1%A8)
      - [Response](#response-6)
      - [Request Sample](#request-sample-6)
    - [提交点赞](#%E6%8F%90%E4%BA%A4%E7%82%B9%E8%B5%9E)
      - [Response](#response-7)
      - [Request Sample](#request-sample-7)
    - [删除点赞](#%E5%88%A0%E9%99%A4%E7%82%B9%E8%B5%9E)
      - [Response](#response-8)
      - [Request Sample](#request-sample-8)
  - [User](#user)
    - [登陆](#%E7%99%BB%E9%99%86)
      - [Response](#response-9)
      - [Request Sample](#request-sample-9)
    - [注册](#%E6%B3%A8%E5%86%8C)
      - [Response](#response-10)
      - [Request Sample](#request-sample-10)
    - [获取用户头像](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F)
      - [Response](#response-11)
      - [Request Sample](#request-sample-11)
    - [获取用户信息](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
      - [Response](#response-12)
      - [Request Sample](#request-sample-12)
    - [修改用户头像](#%E4%BF%AE%E6%94%B9%E7%94%A8%E6%88%B7%E5%A4%B4%E5%83%8F)
      - [Response](#response-13)
      - [Request Sample](#request-sample-13)
    - [修改用户信息](#%E4%BF%AE%E6%94%B9%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
      - [Response](#response-14)
      - [Request Sample](#request-sample-14)
    - [修改用户密码](#%E4%BF%AE%E6%94%B9%E7%94%A8%E6%88%B7%E5%AF%86%E7%A0%81)
      - [Response](#response-15)
      - [Request Sample](#request-sample-15)
  - [Collection](#collection)
    - [获取个人收藏新闻列表](#%E8%8E%B7%E5%8F%96%E4%B8%AA%E4%BA%BA%E6%94%B6%E8%97%8F%E6%96%B0%E9%97%BB%E5%88%97%E8%A1%A8)
      - [Response](#response-16)
      - [Request Sample](#request-sample-16)
    - [提交收藏](#%E6%8F%90%E4%BA%A4%E6%94%B6%E8%97%8F)
      - [Response](#response-17)
      - [Request Sample](#request-sample-17)
    - [删除收藏](#%E5%88%A0%E9%99%A4%E6%94%B6%E8%97%8F)
      - [Response](#response-18)
      - [Request Sample](#request-sample-18)
  - [History](#history)
    - [获取个人历史浏览新闻列表](#%E8%8E%B7%E5%8F%96%E4%B8%AA%E4%BA%BA%E5%8E%86%E5%8F%B2%E6%B5%8F%E8%A7%88%E6%96%B0%E9%97%BB%E5%88%97%E8%A1%A8)
      - [Response](#response-19)
      - [Request Sample](#request-sample-19)
    - [提交历史新闻](#%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2%E6%96%B0%E9%97%BB)
      - [Response](#response-20)
      - [Request Sample](#request-sample-20)
    - [删除历史新闻](#%E5%88%A0%E9%99%A4%E5%8E%86%E5%8F%B2%E6%96%B0%E9%97%BB)
      - [Response](#response-21)
      - [Request Sample](#request-sample-21)

<!-- /TOC -->

## News

### 获取新闻列表

从 offset 开始，共 count 条

- **URL: /news/list/offset=:offset&&count=:count**

- **Type: Get**

#### Response

- Response 200

  ```json
  {
    "data": [
      {
        "group_id": "id",
        "author": "author",
        "time": "4412000000",
        "title": "title",
        "images_info": "json string",
        "comments": 0
      }, {
        "group_id": "id",
        "author": "author",
        "time": "4412000000",
        "title": "title",
        "images_info": "json string",
        "comments": 0
      }
    ]
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: (id)self
                                                   delegateQueue: nil];
  NSURL *url = [NSURL URLWithString:@"http://serverIP/news/list/offset=0&count=10"];

  NSURLSessionDataTask *dataTask =
    [session dataTaskWithURL: url completionHandler: ^(NSData *data, NSURLResponse *response, NSError *err) {
      if (nil == err) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                             options: 0
                                                               error: nil];
        // code with dict data
      }
  }];
  [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/news/list/offset=0&count=10')
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 获取新闻详情

- **URL: /news/content/id=:newsID'**

- **Type: Get**

#### Response

- Response 200

  ```json
  {
    "data": "content"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: (id)self
                                                   delegateQueue: nil];
  NSURL *url = [NSURL URLWithString:@"http://serverIP/news/content/id=111sdfsd111'"];

  NSURLSessionDataTask *dataTask =
    [session dataTaskWithURL: url completionHandler: ^(NSData *data, NSURLResponse *response, NSError *err) {
      if (nil == err) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                             options: 0
                                                               error: nil];
        // code with dict data
      }
  }];
  [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/news/content/id=111sdfsd111')
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

## Comment

### 获取新闻评论列表

- **URL: /comment/newsID=:newsID**

- **Type: GET**

#### Response

- Response 200

  ```json
  {
    "comments": [
      {
        "commentID": 1,
        "newsID": "newsID",
        "userID": "username",
        "stars": 123,
        "time": "time"
      }, {
        "commentID": 2,
        "newsID": "newsID",
        "userID": "username",
        "stars": 123,
        "time": "time"
      }
    ]
  }
  ```

- Response 400

  ```json
  {
    "message": "msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: (id)self
                                                   delegateQueue: nil];
  NSURL *url = [NSURL URLWithString:@"http://serverIP/comment/newsID=newsID"];

  NSURLSessionDataTask *dataTask =
    [session dataTaskWithURL: url completionHandler: ^(NSData *data, NSURLResponse *response, NSError *err) {
      if (nil == err) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                             options: 0
                                                               error: nil];
        // code with dict data
      }
  }];
  [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/comment/newsID=newsID')
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 获取个人评论新闻列表

- **URL: /comment/username=:username**

- **Type: GET**

#### Response

- Response 200

  ```json
  {
    "data": [
      {
        "newsID": "newsID",
        "newsTitle": "newsTitle",
        "author": "author",
        "time": "time",
        "stars": 123,
        "comments": 123
      }, {
        "newsID": "newsID",
        "newsTitle": "newsTitle",
        "author": "author",
        "time": "time",
        "stars": 123,
        "comments": 123
      }
    ]
  }
  ```

- Response 400

  ```json
  {
    "message": "msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: (id)self
                                                   delegateQueue: nil];
  NSURL *url = [NSURL URLWithString:@"http://serverIP/comment/username=username"];

  NSURLSessionDataTask *dataTask =
    [session dataTaskWithURL: url completionHandler: ^(NSData *data, NSURLResponse *response, NSError *err) {
      if (nil == err) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                             options: 0
                                                               error: nil];
        // code with dict data
      }
  }];
  [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/comment/username=username')
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 提交评论

- **URL: /comment**

- **Type: POST**

- Data

  ```json
  {
    "newsID": "newsID",
    "userID": "username",
    "time": "time",
    "content": "content"
  }
  ```

#### Response

- Response 200
  ```json
  {
    "data": 123
  }
  ```

- Response 400

  ```json
  {
    "message": "err msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/user/login"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"username=test&password=test";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.post('http://serverIP/comment', {
    userID: "username",
    newsID: "newsID",
    time: "time",
    content: "content"
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

## Star

### 获取个人点赞评论列表

- **URL: /star/comments/username=:username**

- **Type: GET**

#### Response

- Response 200

  ```json
  {
    "data": [
      {
        "commentID": "commentID",
        "userID": "userID",
        "time": "time",
        "stars": 123,
        "content": "content"
      }, {
        "commentID": "commentID",
        "userID": "userID",
        "time": "time",
        "stars": 123,
        "content": "content"
      }
    ]
  }
  ```

- Response 400

  ```json
  {
    "message": "msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: (id)self
                                                   delegateQueue: nil];
  NSURL *url = [NSURL URLWithString:@"http://serverIP/star/comments/username=username"];

  NSURLSessionDataTask *dataTask =
    [session dataTaskWithURL: url completionHandler: ^(NSData *data, NSURLResponse *response, NSError *err) {
      if (nil == err) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                             options: 0
                                                               error: nil];
        // code with dict data
      }
  }];
  [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/star/comments/username=username')
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 获取个人点赞评论所属新闻列表

- **URL: /star/username=:username**

- **Type: GET**

#### Response

- Response 200

  ```json
  {
    "data": [
      {
        "newsID": "newsID",
        "newsTitle": "newsTitle",
        "author": "author",
        "time": "time",
        "stars": 123,
        "comments": 123
      }, {
        "newsID": "newsID",
        "newsTitle": "newsTitle",
        "author": "author",
        "time": "time",
        "stars": 123,
        "comments": 123
      }
    ]
  }
  ```

- Response 400

  ```json
  {
    "message": "msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: (id)self
                                                   delegateQueue: nil];
  NSURL *url = [NSURL URLWithString:@"http://serverIP/star/username=username"];

  NSURLSessionDataTask *dataTask =
    [session dataTaskWithURL: url completionHandler: ^(NSData *data, NSURLResponse *response, NSError *err) {
      if (nil == err) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                             options: 0
                                                               error: nil];
        // code with dict data
      }
  }];
  [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/star/username=username')
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 提交点赞

- **URL: /star/creation**

- **Type: Post**

- Data

  ```json
  {
    "userID": "username",
    "commentID": "commentID"
  }
  ```

#### Response

- Response 200

  ```json
  {
    "count": 12
  }
  ```

- Response 400

  ```json
  {
    "message": "msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/star/creation"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"userID=test&commentID=123";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.post('http://serverIP/star/creation', {
    userID: "username",
    commentID: 123
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 删除点赞

- **URL: /star/deletion**

- **Type: POST**

- Data

  ```json
  {
    "userID": "username",
    "commentID": "commentID"
  }
  ```

#### Response

- Response 200
  ```json
  {
    "count": 11
  }
  ```

- Response 400

  ```json
  {
    "message": "err msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/star/deletion"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"userID=test&commentID=123";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.post('http://serverIP/star/deletion', {
    userID: "username",
    commentID: 123
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

## User

### 登陆

- **URL: /user/login**

- **Type: Post**

- Data

  ```json
  {
    "username": "username",
    "password": "password"
  }
  ```

#### Response

- Response 200
  ```json
  {
    "message": "success",
    "token": "token"
  }
  ```

- Response 400

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/user/login"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"username=test&password=test";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.post('http://serverIP/user/login', {
    username: "test",
    password: "test"
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 注册

- **URL: /user/signup**

- **Type: Post**

- Data

  ```json
  {
    "username": "username",
    "password": "password",
    "telephone": "telephone"
  }
  ```

#### Response

- Response 200

  ```json
  {
    "message": "success"
  }
  ```

- Response 401

  ```json
  {
    "message": "err msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "Internal Server Error"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/user/signup"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"username=test&password=test";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/user/signup', {
    username: "test",
    password: "test"
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 验证

- **URL: /user/verification**

- **Type: Post**

- Data

  ```json
  {
    "token": "token"
  }
  ```

#### Response

- Response 200

  ```json
  {
    "username": "username"
  }
  ```

- Response 403

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/user/verification"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"token=token";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/user/verification', {
    token: "token"
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 获取用户头像

*默认头像：MTc2MjI0NjU3MTIwMDE4MDIxMDU=.png*

- **URL: /image/avatar/:filename**

- **Type: GET**

#### Response

- Response 200

	*Image file*

- Response 404

	*Not Found*

- Response 500

	*Internal Server Error*

#### Request Sample

- Objective-c

  ```objc
  // Here shows the default avatar
  [cell.img sd_setImageWithURL:@"http://serverIP/image/avatar/MTc2MjI0NjU3MTIwMDE4MDIxMDU=.png" placeholderImage:[UIImage imageNamed:@"avatar.jpg"]];
  ```

### 获取用户信息

- **URL: /user/info/:username**

- **Type: GET**

#### Response

- Response 200

	```json
	{
		"username": {
			"avatar": "url",
			"telephone": "tel"
		}
	}
	```

- Response 401

	```json
	{
		"message": "No match user"
	}
	```

- Response 500

	```json
	{
		"message": "Internal server error"
	}
	```


#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: (id)self
                                                   delegateQueue: nil];
  NSURL *url = [NSURL URLWithString:@"http://serverIP/user/info/0"];

  NSURLSessionDataTask *dataTask =
    [session dataTaskWithURL: url completionHandler: ^(NSData *data, NSURLResponse *response, NSError *err) {
      if (nil == err) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                             options: 0
                                                               error: nil];
        // code with dict data
      }
  }];
  [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/user/info/0')
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 修改用户头像

- **URL: /user/avatar**

- **Type: POST**

- Data

  **使用表单提交**
  
  ```json
  {
    "file": "Image file of avatar",
    "username": "username"
  }
  ```

#### Response

- Response 200

	```json
	{
		"avatar": "avatar file name string"
	}
	```

- Response 401

	```json
	{
		"message": "No match user"
	}
	```

- Response 500

	```json
	{
		"message": "Internal server error"
	}
	```

#### Request Sample

- Objective-c

  ```objc
  AFHTTPSessionManager *manager = [AFHTTPSessionManager manager];
  manager.responseSerializer.acceptableContentTypes = [NSSet setWithObjects:@"application/json",
                                                        @"text/html",
                                                        @"image/jpeg",
                                                        @"image/png",
                                                        @"application/octet-stream",
                                                        @"text/json",
                                                        nil];
  manager.requestSerializer= [AFHTTPRequestSerializer serializer];
  manager.responseSerializer= [AFHTTPResponseSerializer serializer];
  [manager POST:@"http://serverIP/user/avatar" parameters:nil constructingBodyWithBlock:^(id<AFMultipartFormData>  _Nonnull formData) {
      UIImage *image = [UIImage imageNamed:@"headImg"];
      NSData *data = UIImageJPEGRepresentation(image, 1.0);
      
      //上传的参数(上传图片，以文件流的格式)
      [formData appendPartWithFileData:data
                                  name:@"file"
                              fileName:@"headImg.jpg"
                              mimeType:@"image/png"];
      [formData appendPartWithFormData:[@"111" dataUsingEncoding:NSUTF8StringEncoding] name:@"username"];
  } progress:^(NSProgress * _Nonnull uploadProgress) {

  } success:^(NSURLSessionDataTask * _Nonnull task, id  _Nullable responseObject) {
      NSLog(@"上传成功");
  } failure:^(NSURLSessionDataTask * _Nullable task, NSError * _Nonnull error) {
      NSLog(@"上传失败%@",error);
  }];
  ```

- javascript

  ```javascript
  axios.post('http://serverIP/user/avatar', {
		username: "test",
		file: "file"
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 修改用户信息

- **URL: /user/info**

- **Type: POST**

- Data

  ```json
  {
		"username": "username",
		"telephone": "tel"
  }
  ```

#### Response

- Response 200

	```json
	{
		"message": "success"
	}
	```

- Response 401

	```json
	{
		"message": "No match user"
	}
	```

- Response 500

	```json
	{
		"message": "Internal server error"
	}
	```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/user/info"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"username=test&telephone=123";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.post('http://serverIP/user/info', {
		username: "test",
		telephone: "123"
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 修改用户密码

- **URL: /user/password**

- **Type: POST**

- Data

  ```json
  {
    "username": "username",
    "oldPassword": "test",
    "newPassword": "test"
  }
  ```

#### Response

- Response 200

	```json
	{
		"message": "success"
	}
	```

- Response 401

	```json
	{
		"message": "No match user"
	}
	```

- Response 500

	```json
	{
		"message": "Internal server error"
	}
	```


#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/user/password"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"username=test&password=123";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/user/password', {
		username: "test",
		password: "test"
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

## Collection

### 获取个人收藏新闻列表

- **URL: /collection/username=:username**

- **Type: GET**

#### Response

- Response 200

  ```json
  {
    "data": [
      {
        "newsID": "newsID",
        "newsTitle": "newsTitle",
        "author": "author",
        "time": "time",
        "stars": 123,
        "comments": 123
      }, {
        "newsID": "newsID",
        "newsTitle": "newsTitle",
        "author": "author",
        "time": "time",
        "stars": 123,
        "comments": 123
      }
    ]
  }
  ```

- Response 400

  ```json
  {
    "message": "msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: (id)self
                                                   delegateQueue: nil];
  NSURL *url = [NSURL URLWithString:@"http://serverIP/collection/username=username"];

  NSURLSessionDataTask *dataTask =
    [session dataTaskWithURL: url completionHandler: ^(NSData *data, NSURLResponse *response, NSError *err) {
      if (nil == err) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                             options: 0
                                                               error: nil];
        // code with dict data
      }
  }];
  [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/collection/username=username')
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 提交收藏

- **URL: /collection/creation**

- **Type: Post**

- Data

  ```json
  {
    "userID": "username",
    "newsID": "newsID"
  }
  ```

#### Response

- Response 200

  ```json
  {
    "collection": 12
  }
  ```

- Response 400

  ```json
  {
    "message": "msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/collection/creation"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"userID=test&commentID=123";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.post('http://serverIP/collection/creation', {
    userID: "username",
    commentID: 123
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 删除收藏

- **URL: /collection/deletion**

- **Type: POST**

- Data

  ```json
  {
    "userID": "username",
    "newsID": "newsID"
  }
  ```

#### Response

- Response 200
  ```json
  {
    "message": "success"
  }
  ```

- Response 400

  ```json
  {
    "message": "err msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/collection/deletion"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"userID=test&commentID=123";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.post('http://serverIP/collection/deletion', {
    userID: "username",
    commentID: 123
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

## History

### 获取个人历史浏览新闻列表

- **URL: /history/username=:username**

- **Type: GET**

#### Response

- Response 200

  ```json
  {
    "data": [
      {
        "newsID": "newsID",
        "newsTitle": "newsTitle",
        "author": "author",
        "time": "time",
        "stars": 123,
        "comments": 123
      }, {
        "newsID": "newsID",
        "newsTitle": "newsTitle",
        "author": "author",
        "time": "time",
        "stars": 123,
        "comments": 123
      }
    ]
  }
  ```

- Response 400

  ```json
  {
    "message": "msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: (id)self
                                                   delegateQueue: nil];
  NSURL *url = [NSURL URLWithString:@"http://serverIP/history/username=username"];

  NSURLSessionDataTask *dataTask =
    [session dataTaskWithURL: url completionHandler: ^(NSData *data, NSURLResponse *response, NSError *err) {
      if (nil == err) {
        NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                             options: 0
                                                               error: nil];
        // code with dict data
      }
  }];
  [dataTask resume];
  ```

- javascript

  ```javascript
  axios.get('http://serverIP/history/username=username')
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 提交历史新闻

- **URL: /history/creation**

- **Type: Post**

- Data

  ```json
  {
    "userID": "username",
    "newsID": "newsID"
  }
  ```

#### Response

- Response 200

  ```json
  {
    "history": 12
  }
  ```

- Response 400

  ```json
  {
    "message": "msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/history/creation"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"userID=test&commentID=123";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.post('http://serverIP/history/creation', {
    userID: "username",
    commentID: 123
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### 删除历史新闻

- **URL: /history/deletion**

- **Type: POST**

- Data

  ```json
  {
    "userID": "username",
    "newsID": "newsID"
  }
  ```

#### Response

- Response 200
  ```json
  {
    "message": "success"
  }
  ```

- Response 400

  ```json
  {
    "message": "err msg"
  }
  ```

- Response 500

  ```json
  {
    "message": "err msg"
  }
  ```

#### Request Sample

- Objective-c

  ```objc
  NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
  NSURLSession *session = [NSURLSession sessionWithConfiguration: config
                                                        delegate: nil
                                                   delegateQueue: nil];
    NSURL *url = [NSURL URLWithString:@"http://serverIP/history/deletion"];
    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url];
    [request setHTTPMethod:@"POST"];
    NSString *params = @"userID=test&commentID=123";
    [request setHTTPBody:[params dataUsingEncoding:NSUTF8StringEncoding]];

    NSURLSessionDataTask *dataTask =
      [session dataTaskWithRequest: request completionHandler: ^(NSData *data, NSURLResponse *res, NSError *err) {
        if (nil == err) {
          NSDictionary *dict = [NSJSONSerialization JSONObjectWithData: data
                                                               options: 0
                                                                 error: nil];
          // code with dict data
        }
    }];

    [dataTask resume];
  ```

- javascript

  ```javascript
  axios.post('http://serverIP/history/deletion', {
    userID: "username",
    commentID: 123
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```