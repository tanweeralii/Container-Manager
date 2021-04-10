# Docker's container manager

* [Description](#description)
* [Features](#features)
* [Setup](#setup)

## Description
Web interface to manage docker containers through [Docker's Engine API](https://docs.docker.com/engine/api/).

## Features

* **Web terminal to run bash commands inside running containers**
* **Upload files inside running containers**
* **Logs of Containers**
* **List Running Containers**
* **List Images**
* **List All Containers**
* **Stop Containers**
* **Start Containers**
* **Restart Containers**

## Setup

First, Enable Docker's Engine API on port `5555`.
```
Edit /lib/systemd/system/docker.service
Add  `ExecStart=/usr/bin/dockerd -H fd:// -H=tcp://0.0.0.0:5555`
Restart docker service
```

Now follow these steps to setup Docker manager web application

1. Clone this repo.
2. Run this in root directory to install all packages.
```
$ npm install i
```
3. Rename `src/env/.env.sample` to `src/env/.env`.
4. Uncomment [9th line of app.js](https://github.com/tanweeralii/Container-Manager/blob/de8ef7aec6da5a00faac8cae4ef102549ef2ca8d/app.js#L9) to setup database and add a test user credential to it.
5. Run this to start web server and setup database.
```
$ node app.js
```
6. Use these default credentials to Login.
```
username : test
password : testpassword
```
7. Make sure to comment [9th line of app.js](https://github.com/tanweeralii/Container-Manager/blob/de8ef7aec6da5a00faac8cae4ef102549ef2ca8d/app.js#L9) after you run webserver first time as database setup has already done.