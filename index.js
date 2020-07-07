const mongoose = require('mongoose');
const app = require('./src/index');
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@ds255958.mlab.com:55958/heroku_ln8xkrgn`;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started`);
});

mongoose.connect(DB_URI, options, (error) => {
  if (error) throw error;
  console.log('Successfully started the database');
});
