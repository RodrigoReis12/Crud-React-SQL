const express = require('express');
const connection = require('./connection');
const cors = require('cors');
const todoRoute = require('./routes/tdlist');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/tdlist', todoRoute);



module.exports = app;
