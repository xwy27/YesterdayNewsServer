# API-Design

<!-- TOC -->

- [API-Design](#api-design)
  - [News](#news)
    - [获取新闻列表](#获取新闻列表)
      - [Response](#response)
      - [Request Sample](#request-sample)
    - [获取新闻详情](#获取新闻详情)
      - [Response](#response-1)
      - [Request Sample](#request-sample-1)
  - [Comment](#comment)
    - [获取新闻评论列表](#获取新闻评论列表)
      - [Response](#response-2)
      - [Request Sample](#request-sample-2)
    - [获取个人评论列表](#获取个人评论列表)
      - [Response](#response-3)
      - [Request Sample](#request-sample-3)
    - [提交评论](#提交评论)
      - [Response](#response-4)
      - [Request Sample](#request-sample-4)
  - [Star](#star)
    - [获取个人点赞列表](#获取个人点赞列表)
      - [Response](#response-5)
      - [Request Sample](#request-sample-5)
    - [提交点赞](#提交点赞)
      - [Response](#response-6)
      - [Request Sample](#request-sample-6)
    - [删除点赞](#删除点赞)
      - [Response](#response-7)
      - [Request Sample](#request-sample-7)
  - [User](#user)
    - [登陆](#登陆)
      - [Response](#response-8)
      - [Request Sample](#request-sample-8)
    - [注册](#注册)
      - [Response](#response-9)
      - [Request Sample](#request-sample-9)
    - [获取用户头像](#获取用户头像)
      - [Response](#response-10)
      - [Request Sample](#request-sample-10)
    - [获取用户信息](#获取用户信息)
      - [Response](#response-11)
      - [Request Sample](#request-sample-11)
    - [修改用户头像](#修改用户头像)
      - [Response](#response-12)
      - [Request Sample](#request-sample-12)
    - [修改用户信息](#修改用户信息)
      - [Response](#response-13)
      - [Request Sample](#request-sample-13)
    - [修改用户密码](#修改用户密码)
      - [Response](#response-14)
      - [Request Sample](#request-sample-14)

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
    "data": [
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
    "newsID": "username",
    "userID": "password",
    "time": "time",
    "content": "content"
  }
  ```

#### Response

- Response 200
  ```json
  {
    "comments": 123
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

### 获取个人点赞新闻列表

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
    "message": "success"
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
    "password": "password"
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