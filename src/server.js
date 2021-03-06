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

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}!`);
});

module.exports = app;
