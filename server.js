require('dotenv').config();

const express = require('express');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');

// Set db
require('./data/reddit-db');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(expressValidator());

require('./controllers/posts')(app);

app.get('/', (req, res) => {
  return res.render('home');
});

app.get('/posts/new', (req, res) => {
  return res.render('posts-new');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});
