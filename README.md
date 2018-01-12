# Tanuki


# Deploy and dev

Because we love ES6, ES7 and ESWhateverYouWant, *Tanuki* uses [babel](https://github.com/babel/babel) so you can always use the latest JS features.
Tanuki also uses [pm2](https://github.com/Unitech/pm2) because it's an adorable solution to deploy applications and it runs your nodejs script as a multithreaded application.

# Architecture

## app.js

We require our modules and configurations to build the server and the app.
Then we attach our features (from other folders) to the `server` and the `app` :
- Api routes in the **__API__** folder.

## API

3 main folders :

- models/
- middlewares/
- routes/

### models

Get data from your database and return it as a raw Javascript Object

### middlewares

Retrieve data from your models, process the data and add it to the req object, then call next().

### routes

Use your middlewares to obtain the data needed, then write a 'last middleware' that will get the req object, gather the datas and return it.

# What are we doing ?

The perpice of this project is to be the base project for any new API / Website I'll make. It has to depend on reliable libs so I won't have to worry about security issues, or dependencies maintainment. Features won't be coded 'from scratch' but build with well known and well adopted packages :

- *Express* as back-end framework
- *Passport* for authentication
- *Joi* for body validation
- *mocha* and *supertest* for testing
