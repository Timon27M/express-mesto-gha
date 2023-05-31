const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routesUser = require('./routes/users');
const routesCard = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  req.user = {
    _id: '6475f8366a4eecace6b436c6',
  };

  next();
});

app.use('/', (err, res) => {
  res.status(404).send({ message: 'Неправильный путь' });
});

app.use('/', routesUser);
app.use('/', routesCard);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Server ${PORT}`);
});
