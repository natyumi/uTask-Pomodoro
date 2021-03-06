const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();

const routes = require('./routes');
const database = require('./database');

database();

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
