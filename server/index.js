const express = require('express');
const cors = require('cors');

const mongooseConnection = require('./databases/mongoose');

const authRouter = require('./app/auth/router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

mongooseConnection(app);

app.get('/', (req, res) => {
  return res.send('Hello world...');
});