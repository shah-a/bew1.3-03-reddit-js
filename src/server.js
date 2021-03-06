require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const models = require('./models');
const { checkAuth } = require('./middleware');
const controllers = require('./controllers');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(checkAuth);

app.use('/', controllers.home);
app.use('/', controllers.auth);
app.use('/posts', controllers.posts);
app.use('/n', controllers.subreddits);

models.connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}!`);
    })
  })
  .catch(err => {
    console.log(err.message);
  });

module.exports = app;

// TODO (backlog): implement database seeder
