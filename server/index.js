const express = require('express');
const cors = require('cors');

const mongooseConnection = require('./databases/mongoose');

const authRouter = require('./app/auth/router');
const productRouter = require('./app/product/router');
const categoryRouter = require('./app/category/router');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/api', productRouter);
app.use('/api', categoryRouter);

mongooseConnection(app);

app.get('/', (req, res) => {
  return res.send('Hello world...');
});