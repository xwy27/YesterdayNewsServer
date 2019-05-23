# API-Design

## News

### /news/list/offset=:offset&&count=:count

获取新闻列表，从 offset 开始，共 count 条

#### Type - Get

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

## Comment

### /comment/newsID=:newsID

获取关于新闻(newsID)的评论

#### Type - GET

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

### /comment

给新闻添加评论

#### Type - POST

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

### /star/creation

给评论点赞

#### Type - Post

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

### /comment/deletion

给新闻删除评论

#### Type - POST

- Data

  ```json
  {
    "newsID": "username",
    "commentID": "commentID"
  }
  ```

#### Response

- Response 200
  ```json
  {
    "count": 123
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

### /user/login

#### Type - Post

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

### /user/signup

#### Type - Post

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

### /user/info/:username

获取用户信息

#### Type - GET

#### Response

- Response 200

	```json
	{
		":username": {
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

### /user/info

更改用户信息

#### Type - POST

- Data

  ```json
  {
		"username": "username",
		"telephone": "tel",
		"avatar": "url"
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
    NSString *params = @"username=test&telephone=123&avatar=https://image.com/avatar";
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
  axios.get('http://serverIP/user/info', {
		username: "test",
		telephone: "123",
		avatar: "http://image.com/avatar"
  })
    .then((res) => {
      // code with res
    });
    .catch((err) => {
      // code with err
    });
  ```

### /user/password

更改用户密码

#### Type - POST

- Data

  ```json
  {
		"username": "username",
		"password": "test"
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