const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { NOT_FOUND } = require('./сonstants/statusCode');

const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: '647835fcb32ef4b4f6d47631',
  };

  next();
});

app.use('/', routesUser);
app.use('/', routesCard);

app.use('/', (req, res) => {
  res
    .status(NOT_FOUND)
    .send({ message: 'Произошла ошибка: Неправильный путь' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server ${PORT}`);
});
