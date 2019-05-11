# YesterdayNewsServer

Back-end Server for YesterdayNews project

## Dependecy

|node|npm|MySQL|
|:--:|:-:|:---:|
|>=v10.0|>=v6.0|v5.7|

## Usage

### API Reference

[API-Design](./docs/API-Design.md)

### Deployment

1. Create database

    Run your MySQL and create `YesterdayNews` database.
    ```sql
    CREATE DATABASE IF NOT EXISTS YesterdayNews;
    ```

1. Update database configuration

    To make connection with your MySQL, update `config/database.js` with your own configuration.

1. Install dependency

    ```bash
    cd YesterdayNewsServer
    npm install
    ```

1. Start

    ```bash
    npm start
    ```

## ***Q&A***

- AUTHENTICATION ERROR
    > Q:Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
    >
    > A:Fix MySQL to v5.7. Because the newest version updates the encrypt algorithm for password which results the password mismatching.
