const express = require('express');
const mongooseConnection = require('./databases/mongoose');

const app = express();

mongooseConnection(app);

app.get('/', (req, res) => {
  return res.send('Hello world...');
});