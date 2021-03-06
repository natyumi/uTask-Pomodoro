const express = require('express');

const app = express();

//Controladoras
const UserController = require('./app/controllers/UserController');
const TaskController = require('./app/controllers/TaskController');

//Middleware
const verifyJWT = require('./app/middlewares/auth');

app.get('/', function (req, res) {
  res.send('uTask-Pomodoro');
});

// users
app.post('/users/login', UserController.login);
app.post('/users/create', UserController.create);
app.put('/users/findUser', verifyJWT, UserController.findUser);
app.post('/users/getTimes', verifyJWT, UserController.getTimes);

// tasks
app.get('/tasks', verifyJWT, TaskController.index);
app.post('/tasks', verifyJWT, TaskController.create);
app.put('/tasks', verifyJWT, TaskController.update);
app.delete('/tasks', verifyJWT, TaskController.delete);

module.exports = app;
