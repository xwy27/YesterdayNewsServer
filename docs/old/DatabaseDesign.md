# Database-Design

## News

|ID|Username|Type|Title|PublishTime|Content|DisplayType|Category|
|:-:|:---:|:--:|:---:|:---------:|:-----:|:---------:|:------:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|Bool|String|String|String|String|String|

## AbstractImage

|ID|NewsID|ImageURL|
|:-:|:---:|:------:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|String|

## NewsStar

|ID|NewsID|Username|
|:-:|:---:|:----:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|Integer<br>Foreign Key|

## Comments

|ID|NewsID|Username|Content|PublishTime|Star|
|:-:|:---:|:----:|:-----:|:---------:|:--:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|Integer<br>Foreign Key|String|String|Integer|

## CommentReply

|ID|CommentID|Username|Content|PublishTime|Star|
|:-:|:------:|:----:|:-----:|:---------:|:--:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|Integer<br>Foreign Key|String|String|Integer|

## CommentStar

|ID|CommentID|Username|
|:-:|:------:|:----:|
|Integer<br>Unique<br>Primary Key|Integer<br>Foreign Key|Integer<br>Foreign Key|

## User

|Username|Password|Avatar|
|:-----:|:------:|:----:|
|String<br>Primary Key|String|String|
