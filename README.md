# Tanuki

Tanuki is a tool, or a framework (call it as you want) that I've created to save time and to not have to rebuild the wheel everytime I start a new Express based API or Website.

The perpice of this project is to have a tool that is able to build the same API and Website with a lot of different databases or front-end technologies while keeping the same NodeJS / Express design.

For example, in one command, you will be able to have an application with user management and admin panel with the following technologies :
 * MySQL, ReactJS / Redux, SASS
 * MongoDB, AngularJS, LESS
 * PostgreSQL, VanillaJS, Pug, SASS (My favorite ^^)


# Deploy and dev

Because we love ES6, ES7 and ESWhateverYouWant, *Tanuki* uses [babel](https://github.com/babel/babel) so you can always use the latest JS features.
Tanuki also uses [pm2](https://github.com/Unitech/pm2) because it's an adorable solution to deploy applications and it runs your nodejs script as a multithreaded application.

# Architecture

When I have the time, I will draw this architecture to make it more understandable.

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


## TODO

* adding 'self' feature to accessControl
