const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { NOT_FOUND } = require('./сonstants/statusCode');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');

const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', routesUser);
app.use('/', routesCard);
app.use(errors());

app.use('/', (req, res) => {
  res
    .status(NOT_FOUND)
    .send({ message: 'Произошла ошибка: Неправильный путь' });
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server ${PORT}`);
});
