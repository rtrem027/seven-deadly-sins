const express = require('express');
require('express-async-errors');
const { quadrinhos, paginas } = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use('/quadrinhos', quadrinhos);

app.use('/paginas', paginas);

app.use(errorMiddleware);

module.exports = {
  app,
}