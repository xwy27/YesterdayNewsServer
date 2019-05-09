# Database-Design

## News

|ID|UserID|Type|Title|PublishTime|Content|DisplayType|Category|
|:-:|:---:|:--:|:---:|:---------:|:-----:|:---------:|:------:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|Bool|String|String|String|String|String|

## AbstractImage

|ID|NewsID|ImageURL|
|:-:|:---:|:------:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|String|

## NewsStar

|ID|NewsID|UserID|
|:-:|:---:|:----:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|Integer<br>Foreign Key|

## Comments

|ID|NewsID|UserID|Content|PublishTime|Star|
|:-:|:---:|:----:|:-----:|:---------:|:--:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|Integer<br>Foreign Key|String|String|Integer|

## CommentReply

|ID|CommentID|UserID|Content|PublishTime|Star|
|:-:|:------:|:----:|:-----:|:---------:|:--:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|Integer<br>Foreign Key|String|String|Integer|

## CommentStar

|ID|CommentID|UserID|
|:-:|:------:|:----:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|Integer<br>Foreign Key|

## User

|ID|Username|Password|Avatar|
|:-:|:-----:|:------:|:----:|
|Integer<br>Unique<br>Primary Key|String|String|String|
