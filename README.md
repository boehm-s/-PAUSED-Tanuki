# es6-express-api

ES6 API Boilerplate based on Express, Starter kit for any Express-based API / Website project

Multiples branches will be available with a basic user management system for different databases (Postgres, MySQL, Mongo and more ?)

In the FRONT/ directory, you will find the same folders that are created by the express-generator
In the API/ directory, you will find your controllers, (models), routes and (helpers). This design is made to efficiently use the Express Middlewares.

# Deploy and dev

This project use [pm2](https://github.com/Unitech/pm2) with [babel](https://github.com/babel/babel) so you can always use the latest features and deploy with a multithreaded solution (`pm2`).

# Architecture

## app.js

We require our modules and configurations to build the server and the app.
Then we attach our features (from other folders) to the `server` and the `app` :
- Api routes in the **__API__** folder.
- Front-End routes in the **__FRONT__** folder.
- Websocket routes in the **__WS__** folder.

## API

3 main folders :

- models/
- controllers/
- routes/

### models

Get data from your database and return it as a raw Javascript Object

### controllers

Retrieve data from your models, process the data and add it to the req object, then call next().

### routes

Use your controllers as middlewares to obtain the data needed, then write a 'last middleware' that will get the req object, gather the datas and return it.
