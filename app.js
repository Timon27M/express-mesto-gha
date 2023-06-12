const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { NOT_FOUND } = require('./сonstants/statusCode');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const {
  validatorLogin,
  validatorCreateUser,
} = require('./middlewares/validators');

const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.post('/signin', validatorLogin, login);
app.post('/signup', validatorCreateUser, createUser);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '6475f8366a4eecace6b436c6',
//   };

//   next();
// });

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
